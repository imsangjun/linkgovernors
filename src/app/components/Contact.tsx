import { useState } from "react";
import type { FormEvent } from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";
import { supabase } from "../lib/supabaseClient";

type Status = "idle" | "submitting" | "success" | "error";

interface LeadData {
  domain: string;
  email: string;
  company: string;
  services: string;
  budget: string;
  message: string;
}

// 진단 폼에서 고를 수 있는 서비스 (서비스 페이지 4축과 일치)
const SERVICE_OPTIONS = [
  "웹사이트 제작",
  "온페이지 SEO 세팅",
  "백엔드 웹개발",
  "키워드 클러스터",
] as const;

export function Contact() {
  useRevealOnScroll();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const lead: LeadData = {
      domain: String(formData.get("domain") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      services: selectedServices.join(", "),
      budget: String(formData.get("budget") || ""),
      message: String(formData.get("message") || "").trim(),
    };

    // 관심 서비스는 leads 테이블 스키마 변경 없이 message에 함께 담아 전달
    const composedMessage = lead.services
      ? `[관심 서비스: ${lead.services}]${lead.message ? "\n\n" + lead.message : ""}`
      : lead.message;

    // 기본 검증
    if (!lead.domain || !lead.email) {
      setStatus("error");
      setErrorMsg("도메인과 이메일은 필수입니다.");
      return;
    }

    try {
      let delivered = false;

      // 1) 서버리스 함수로 전송 → 운영자 텔레그램으로 자동 알림 (배포 환경)
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, message: composedMessage }),
        });
        if (res.ok) delivered = true;
      } catch {
        // 로컬(vite dev)에는 /api 런타임이 없어 실패 — 아래 폴백으로 처리
      }

      // 2) 폴백: Supabase 저장 또는 개발용 콘솔 기록
      if (!delivered) {
        if (supabase) {
          const { error } = await supabase.from("leads").insert({
            domain: lead.domain,
            email: lead.email,
            company: lead.company || null,
            budget: lead.budget || null,
            message: composedMessage || null,
            source: "website_contact",
            created_at: new Date().toISOString(),
          });
          if (error) throw error;
        } else {
          // 개발용 fallback: 콘솔에만 기록 (실제 배포 시 텔레그램/Supabase 환경변수 설정 필요)
          console.info("[LinkPresso] Lead captured (dev mode):", { ...lead, message: composedMessage });
          await new Promise((r) => setTimeout(r, 600)); // 사용자에게 처리 중 시각적 피드백
        }
      }

      setStatus("success");
      setSelectedServices([]);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Lead submission failed:", err);
      setStatus("error");
      setErrorMsg(
        "전송 중 문제가 발생했습니다. likkoreaofficial@gmail.com 로 직접 메일 보내주시면 빠르게 회신드리겠습니다."
      );
    }
  }

  return (
    <>
      {/* 직접 연락 좌: 안내 카피 + 연락처, 우: 진단 폼 */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Left: 안내 카피 + 연락처 */}
            <div className="md:col-span-5">
              <div className="reveal eyebrow mb-6">/ 직접 연락</div>
              <h1 className="reveal h-display text-[34px] sm:text-[44px] md:text-[52px] max-w-[14ch] ko">
                도메인을 보내주세요<br />
                <span className="text-[#8e8e8e]">진단부터 시작합니다</span>
              </h1>
              <p className="reveal mt-8 text-[15px] md:text-[17px] leading-[1.65] text-[#c8c8c8] max-w-[46ch] ko">
                URL과 연락처만 알려주시면 영업일 기준 2일 안에 무료 진단 리포트를
                보내드립니다. 우리가 도와드릴 수 있는 일인지부터 솔직히 말씀드립니다.
              </p>
              <div className="reveal mt-10 pt-8 border-t border-[#262626] space-y-6">
                <ContactItem label="이메일" value="likkoreaofficial@gmail.com" href="mailto:likkoreaofficial@gmail.com" />
                <div>
                  <div className="text-[13px] text-[#5a5a5a] mb-2 ko">카카오톡 문의</div>
                  <a
                    href="https://open.kakao.com/o/sF4jwPBi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[18px] bg-[#FEE500] px-4 py-2 text-[#191600] text-[14px] font-semibold hover:brightness-95 transition"
                  >
                    <KakaoIcon className="w-[18px] h-[18px] -ml-1" />
                    링크프레소
                  </a>
                </div>
                <ContactItem label="응답 시간" value="평균 1시간 이내" />
              </div>
            </div>

            {/* Right: form */}
            <div className="md:col-span-7">
              {status === "success" ? (
                <SuccessState onReset={() => setStatus("idle")} />
              ) : (
                <form onSubmit={handleSubmit} className="reveal space-y-8" noValidate>
                  <Field
                    label="도메인 URL"
                    name="domain"
                    type="url"
                    placeholder="https://yourcompany.com"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field
                      label="이메일"
                      name="email"
                      type="email"
                      placeholder="contact@yourcompany.com"
                      required
                    />
                    <Field
                      label="회사명 (선택)"
                      name="company"
                      type="text"
                      placeholder="OOO Inc."
                    />
                  </div>

                  {/* 관심 서비스 복수 선택 */}
                  <div>
                    <span className="block text-[12.5px] font-medium text-[#8e8e8e] mb-3 ko">
                      관심 서비스 <span className="text-[#5a5a5a]">(복수 선택 가능)</span>
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {SERVICE_OPTIONS.map((service) => {
                        const active = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            aria-pressed={active}
                            className={
                              "px-4 py-2.5 text-[14px] font-medium border rounded-lg transition-colors ko " +
                              (active
                                ? "border-[#00c800] text-[#00c800] bg-[#00c800]/[0.06]"
                                : "border-[#262626] text-[#c8c8c8] hover:border-[#3a3a3a] hover:text-[#f0f0f0]")
                            }
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <SelectField
                    label="월 예산 범위 (선택)"
                    name="budget"
                    options={[
                      { value: "", label: "선택하지 않음" },
                      { value: "150-300", label: "150만원 ~ 300만원" },
                      { value: "300-500", label: "300만원 ~ 500만원" },
                      { value: "500-1000", label: "500만원 ~ 1,000만원" },
                      { value: "1000+", label: "1,000만원 이상" },
                      { value: "discuss", label: "상담 후 결정" },
                    ]}
                  />

                  <TextareaField
                    label="현재 상황 또는 목표 (선택)"
                    name="message"
                    placeholder="현재 가장 답답하신 부분, 또는 도달하고 싶은 목표를 짧게 적어주세요. 진단의 방향을 잡는 데 도움이 됩니다."
                  />

                  {/* Error */}
                  {status === "error" && (
                    <div className="flex items-start gap-3 p-4 bg-[#141414] border border-[#262626] rounded-lg">
                      <AlertCircle className="w-4 h-4 text-[#00c800] flex-shrink-0 mt-[3px]" />
                      <p className="text-[13.5px] text-[#c8c8c8] leading-[1.6] ko">{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-4 flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-[12px] text-[#5a5a5a] max-w-[40ch] leading-relaxed ko">
                      제출하시면 <a href="/privacy" className="underline underline-offset-2 hover:text-[#f0f0f0]">개인정보처리방침</a>에 따라
                      문의 응답 목적으로만 정보가 사용됩니다.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-2 h-[52px] px-7 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[14.5px] font-medium hover:bg-[#e0e0e0] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          전송 중
                        </>
                      ) : (
                        <>
                          진단 요청
                          <span aria-hidden>→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────────────────────────────────
   Form components
─────────────────────────────────────────────────── */
function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium text-[#8e8e8e] mb-2 ko">
        {label}
        {required && <span className="text-[#00c800] ml-1">*</span>}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full h-[52px] px-4 bg-[#1a1a1a] border border-[#262626] rounded-lg text-[15px] text-[#f0f0f0] placeholder:text-[#3a3a3a] focus:border-[#f0f0f0] focus:outline-none transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium text-[#8e8e8e] mb-2 ko">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="w-full h-[52px] px-4 bg-[#1a1a1a] border border-[#262626] rounded-lg text-[15px] text-[#f0f0f0] focus:border-[#f0f0f0] focus:outline-none transition-colors appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%235a5a5a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
          paddingRight: "44px",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium text-[#8e8e8e] mb-2 ko">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={5}
        className="w-full p-4 bg-[#1a1a1a] border border-[#262626] rounded-lg text-[15px] text-[#f0f0f0] placeholder:text-[#3a3a3a] focus:border-[#f0f0f0] focus:outline-none transition-colors resize-y leading-relaxed ko"
      />
    </label>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  // 카카오톡 말풍선 로고 (인라인 SVG)
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M128 36C70.56 36 24 72.74 24 118.06c0 29.32 19.5 55.05 48.82 69.51-1.61 5.86-8.3 30.23-8.57 32.15 0 0-.17 1.43.76 1.98.93.55 2.02.13 2.02.13 2.69-.38 31.17-20.4 36.1-23.88 7.45 1.05 15.13 1.6 22.85 1.6 57.44 0 104-36.74 104-82.06S185.44 36 128 36z" />
    </svg>
  );
}

function ContactItem({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div>
      <div className="text-[13px] text-[#5a5a5a] mb-2 ko">{label}</div>
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[18px] md:text-[20px] font-medium text-[#f0f0f0] underline underline-offset-2 hover:opacity-70"
        >
          {value}
        </a>
      ) : (
        <div className="text-[18px] md:text-[20px] font-medium text-[#f0f0f0] ko">{value}</div>
      )}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="reveal py-12 md:py-20 text-center md:text-left">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f0f0f0] text-[#0a0a0a] mb-8">
        <Check className="w-5 h-5" />
      </div>
      <h2 className="h-section text-[28px] md:text-[40px] max-w-[20ch] mx-auto md:mx-0 ko">
        잘 받았습니다.<br />
        영업일 기준 2일 안에 회신드립니다
      </h2>
      <p className="mt-6 text-[14.5px] md:text-[15px] text-[#8e8e8e] max-w-[56ch] mx-auto md:mx-0 leading-relaxed ko">
        도메인을 살펴본 뒤, 우리가 도와드릴 수 있는 일인지부터 솔직히 말씀드립니다.
        그 사이 급한 일이 생기시면 likkoreaofficial@gmail.com 로 직접 보내주셔도 됩니다.
      </p>
      <button
        onClick={onReset}
        className="mt-8 text-[14px] font-medium text-[#f0f0f0] border-b border-[#f0f0f0] pb-1 hover:opacity-70"
      >
        다른 도메인 추가 문의
      </button>
    </div>
  );
}
