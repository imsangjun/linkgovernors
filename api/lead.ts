/**
 * 문의 폼 → 텔레그램 자동 알림 (Vercel Edge Function)
 *
 * 동작:
 * - 문의 페이지에서 POST /api/lead 로 폼 데이터가 전송되면
 *   텔레그램 봇을 통해 운영자 채팅으로 메시지를 보냅니다.
 *
 * 필요한 환경변수 (Vercel 프로젝트 설정 → Environment Variables):
 * - TELEGRAM_BOT_TOKEN : @BotFather 로 만든 봇 토큰
 * - TELEGRAM_CHAT_ID   : 알림을 받을 채팅 ID (본인 ID 또는 그룹 ID)
 *
 * 봇 토큰은 서버(이 함수)에만 존재하며 브라우저에 노출되지 않습니다.
 */

export const config = { runtime: "edge" };

interface LeadPayload {
  domain?: string;
  email?: string;
  company?: string;
  services?: string;
  budget?: string;
  message?: string;
}

// 텔레그램 HTML 파싱 모드에서 안전하도록 escape
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const BUDGET_LABELS: Record<string, string> = {
  "150-300": "150만원 ~ 300만원",
  "300-500": "300만원 ~ 500만원",
  "500-1000": "500만원 ~ 1,000만원",
  "1000+": "1,000만원 이상",
  discuss: "상담 후 결정",
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return new Response(JSON.stringify({ ok: false, error: "not_configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let lead: LeadPayload;
  try {
    lead = (await req.json()) as LeadPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "bad_request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 최소 검증
  if (!lead.domain || !lead.email) {
    return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const lines = [
    "🔔 <b>링크프레소 새 문의</b>",
    "",
    `🌐 도메인: ${esc(lead.domain)}`,
    `✉️ 이메일: ${esc(lead.email)}`,
  ];
  if (lead.company) lines.push(`🏢 회사: ${esc(lead.company)}`);
  if (lead.services) lines.push(`🧩 관심 서비스: ${esc(lead.services)}`);
  if (lead.budget) lines.push(`💰 예산: ${esc(BUDGET_LABELS[lead.budget] || lead.budget)}`);
  if (lead.message) lines.push("", `📝 내용:\n${esc(lead.message)}`);

  const text = lines.join("\n");

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text();
      return new Response(JSON.stringify({ ok: false, error: "telegram_failed", detail }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: "network", detail: String(err) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
