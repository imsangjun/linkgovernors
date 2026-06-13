import { useRevealOnScroll } from "../lib/useRevealOnScroll";

export function Privacy() {
  useRevealOnScroll();

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <div className="reveal eyebrow mb-6">법적 고지</div>
        <h1 className="reveal h-display text-[36px] md:text-[56px] mb-12 ko">
          개인정보처리방침
        </h1>

        <div className="reveal text-[12px] text-[#5a5a5a] font-mono mb-12 pb-6 border-b border-[#262626]">
          최종 업데이트 · 2026년 1월 1일 · v1.0
        </div>

        <div className="reveal space-y-10 text-[14.5px] md:text-[15px] leading-[1.8] text-[#c8c8c8] ko">
          <Article num="1" title="수집하는 개인정보 항목">
            회사는 서비스 문의 응답, 진단 리포트 발송, 계약 체결을 위해 필요한 최소한의
            정보만 수집합니다. 수집 항목은 이메일 주소, 회사명(선택), 도메인 URL,
            예산 범위(선택), 문의 내용입니다. 결제 단계에서는 사업자등록번호 등 추가
            정보가 수집될 수 있습니다.
          </Article>

          <Article num="2" title="개인정보의 수집 및 이용 목적">
            수집된 개인정보는 (1) 문의에 대한 응답 및 진단 리포트 제공, (2) 서비스 계약
            체결 및 이행, (3) 고지사항 전달, (4) 부정 이용 방지의 목적으로만 사용됩니다.
            마케팅 활용을 위해서는 별도 동의를 받습니다.
          </Article>

          <Article num="3" title="개인정보의 보유 및 이용 기간">
            문의 응답 목적으로 수집된 정보는 응답 완료 후 6개월간 보관 후 파기합니다.
            계약이 체결된 경우 관련 법령에 따라 5년간 보관됩니다(전자상거래 등에서의
            소비자 보호에 관한 법률 등). 회원이 직접 삭제를 요청하시는 경우 즉시
            파기합니다(법령상 보관 의무 있는 정보 제외).
          </Article>

          <Article num="4" title="개인정보의 제3자 제공">
            회사는 원칙적으로 회원의 개인정보를 제3자에게 제공하지 않습니다. 다만,
            서비스 제공을 위해 필요한 경우(예: 백링크 발행 매체에 회원사 정보 전달)에는
            사전에 회원의 명시적 동의를 받습니다.
          </Article>

          <Article num="5" title="개인정보 처리 위탁">
            회사는 서비스 운영을 위해 다음 업체에 일부 처리를 위탁합니다:
            (1) Vercel — 웹사이트 호스팅, (2) Supabase — 문의 데이터 저장,
            (3) Google Analytics — 웹사이트 트래픽 분석. 위탁업체에 대해서는
            개인정보 보호 의무를 계약상 부과하고 정기적으로 점검합니다.
          </Article>

          <Article num="6" title="이용자의 권리">
            회원은 언제든지 자신의 개인정보를 조회·수정·삭제·처리정지 요청할 수
            있습니다. 요청은 hello@linkpresso.kr 로 보내주시면 영업일 기준
            7일 이내에 처리됩니다.
          </Article>

          <Article num="7" title="개인정보 보호 책임자">
            개인정보 보호와 관련한 문의는 다음 연락처로 보내주시기 바랍니다.
            성명: 홍길동 / 이메일: privacy@linkpresso.kr
          </Article>

          <Article num="8" title="쿠키 사용">
            회사 웹사이트는 사용자 경험 개선과 분석 목적으로 쿠키를 사용합니다.
            브라우저 설정에서 쿠키 저장을 거부할 수 있으나, 일부 기능 이용에 제한이
            있을 수 있습니다.
          </Article>

          <Article num="9" title="개인정보 안전성 확보 조치">
            회사는 개인정보 보호를 위해 (1) 전송 시 HTTPS 암호화, (2) 저장 시
            데이터베이스 암호화, (3) 접근 권한 관리, (4) 정기 보안 점검 등의
            기술적·관리적 조치를 시행하고 있습니다.
          </Article>

          <Article num="10" title="고지 의무">
            본 방침의 변경 시 시행 7일 전부터 웹사이트를 통해 고지합니다. 중대한
            변경(수집 항목 추가, 이용 목적 확대 등)의 경우 30일 전 사전 고지하며,
            필요시 회원의 재동의를 받습니다.
          </Article>
        </div>
      </div>
    </section>
  );
}

function Article({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] text-[#f0f0f0] mb-4 ko">
        제 {num} 조 · {title}
      </h2>
      <p>{children}</p>
    </div>
  );
}
