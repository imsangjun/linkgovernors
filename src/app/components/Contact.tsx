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
  budget: string;
  message: string;
}

export function Contact() {
  useRevealOnScroll();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const lead: LeadData = {
      domain: String(formData.get("domain") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      budget: String(formData.get("budget") || ""),
      message: String(formData.get("message") || "").trim(),
    };

    // 기본 검증
    if (!lead.domain || !lead.email) {
      setStatus("error");
      setErrorMsg("도메인과 이메일은 필수입니다.");
      return;
    }

    try {
      // Supabase 연결되어 있으면 leads 테이블에 insert
      // 없으면 mailto fallback
      if (supabase) {
        const { error } = await supabase.from("leads").insert({
          domain: lead.domain,
          email: lead.email,
          company: lead.company || null,
          budget: lead.budget || null,
          message: lead.message || null,
          source: "website_contact",
          created_at: new Date().toISOString(),
        });
        if (error) throw error;
      } else {
        // 개발용 fallback: 콘솔에만 기록 (실제 배포 시 Supabase 환경변수 설정 필요)
        console.info("[LinkPresso] Lead captured (dev mode):", lead);
        await new Promise((r) => setTimeout(r, 600)); // 사용자에게 처리 중 시각적 피드백
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Lead submission failed:", err);
      setStatus("error");
      setErrorMsg(
        "전송 중 문제가 발생했습니다. hello@linkpresso.kr 로 직접 메일 보내주시면 빠르게 회신드리겠습니다."
      );
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="reveal eyebrow mb-8">문의</div>
          <h1 className="reveal h-display text-[40px] sm:text-[56px] md:text-[80px] max-w-[16ch] ko">
            도메인을 보내주세요<br />
            <span className="text-[#8e8e8e]">진단부터 시작합니다</span>
          </h1>
          <p className="reveal mt-10 text-[16px] md:text-[18px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
            URL과 연락처만 알려주시면 영업일 기준 2일 안에 무료 진단 리포트를
            보내드립니다. 우리가 도와드릴 수 있는 일인지부터 솔직히 말씀드립니다.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Left: meta info */}
            <div className="md:col-span-4">
              <div className="reveal eyebrow mb-6">/ 직접 연락</div>
              <div className="space-y-6">
                <ContactItem label="이메일" value="hello@linkpresso.kr" href="mailto:hello@linkpresso.kr" />
                <ContactItem label="응답 시간" value="영업일 기준 2일 이내" />
                <ContactItem label="대기 명단" value="2026 Q2 기준 운영 중" />
              </div>

              <div className="mt-12 pt-8 rule">
                <div className="eyebrow mb-4">/ 거절하는 영역</div>
                <ul className="space-y-2 text-[13.5px] text-[#8e8e8e] ko">
                  <li>· 도박·성인 콘텐츠</li>
                  <li>· 의약품 직접 판매</li>
                  <li>· 단기 PBN 임대 의뢰</li>
                  <li>· 1개월 단위 계약 요청</li>
                </ul>
                <p className="mt-4 text-[12.5px] text-[#5a5a5a] leading-relaxed ko">
                  위에 해당하시면 다른 업체를 권해드립니다.
                  서로 시간을 아끼는 게 낫습니다.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="md:col-span-8">
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
                      <AlertCircle className="w-4 h-4 text-[#00ff00] flex-shrink-0 mt-[3px]" />
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
        {required && <span className="text-[#00ff00] ml-1">*</span>}
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

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <div className="text-[12px] text-[#5a5a5a] mb-1.5 ko">{label}</div>
      {href ? (
        <a
          href={href}
          className="text-[15px] font-medium text-[#f0f0f0] underline underline-offset-2 hover:opacity-70"
        >
          {value}
        </a>
      ) : (
        <div className="text-[15px] font-medium text-[#f0f0f0] ko">{value}</div>
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
        그 사이 급한 일이 생기시면 hello@linkpresso.kr 로 직접 보내주셔도 됩니다.
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
