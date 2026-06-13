import { Link } from "react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

/**
 * Pricing 페이지 - 3단 요금제 카드
 *
 * 주의: 아래 가격은 placeholder입니다. 실제 가격 정책 확정 시 수정 필요.
 * - 가격 단위: 월별 (VAT 별도 표기)
 * - 약정 기간 할인은 별도 안내
 */

interface PricingPlan {
  name: string;
  tagline: string;
  price: string; // "150" 같은 숫자만 (한글 단위는 별도)
  unit: string; // "만원 / 월" 등
  description: string;
  features: string[];
  cta: { label: string; to: string };
  featured?: boolean;
}

const PLANS: PricingPlan[] = [
  {
    name: "스타터",
    tagline: "검증부터 시작하고 싶을 때",
    price: "TBD",
    unit: "월 / VAT 별도",
    description:
      "신규 도메인이나 권위가 낮은 사이트의 초기 토대를 다지는 패키지입니다. 토픽 권위와 기술적 토대 점검에 집중합니다.",
    features: [
      "도메인 진단 리포트 (월 1회)",
      "온페이지 SEO 개선 권장사항",
      "키워드 리서치 (월 30개)",
      "백링크 모니터링",
      "월간 성과 리포트",
    ],
    cta: { label: "상담 요청", to: "/contact" },
  },
  {
    name: "그로스",
    tagline: "본격적으로 순위를 올리고 싶을 때",
    price: "TBD",
    unit: "월 / VAT 별도",
    description:
      "백링크 확보와 토픽 클러스터 설계를 본격적으로 진행하는 패키지입니다. 가장 많은 클라이언트가 선택하는 옵션입니다.",
    features: [
      "스타터 플랜의 모든 항목",
      "고품질 백링크 (월 5~8건)",
      "토픽 클러스터 1개 설계 · 실행",
      "콘텐츠 작성 가이드 (월 4건)",
      "주간 작업 로그 공유",
      "전담 매니저 1인 배정",
    ],
    cta: { label: "상담 요청", to: "/contact" },
    featured: true,
  },
  {
    name: "엔터프라이즈",
    tagline: "여러 도메인, 복잡한 구조",
    price: "맞춤",
    unit: "별도 견적",
    description:
      "다국가 도메인, 대규모 사이트, 복잡한 사이트 구조를 가진 기업을 위한 패키지입니다. 상담 후 범위와 가격이 결정됩니다.",
    features: [
      "그로스 플랜의 모든 항목",
      "백링크 무제한 (목표 설정 기반)",
      "다국가 / 다언어 도메인 지원",
      "기술 SEO 심층 감사",
      "임원 보고용 분기 리포트",
      "전담 팀 배정",
    ],
    cta: { label: "도입 문의", to: "/contact" },
  },
];

export function Pricing() {
  useRevealOnScroll();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="reveal eyebrow mb-8">요금제</div>
          <h1 className="reveal h-display text-[40px] sm:text-[56px] md:text-[80px] max-w-[18ch] ko">
            세 가지 진입점,<br />
            <span className="text-[#8e8e8e]">정직한 가격</span>
          </h1>
          <p className="reveal mt-10 text-[16px] md:text-[18px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
            도메인 규모, 목표, 현재 상태에 따라 시작점은 달라집니다.
            진단 후 어느 플랜이 맞는지 솔직히 말씀드립니다. 무리한 패키지는 권하지 않습니다.
          </p>
        </div>
      </section>

      {/* Plans grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-px md:bg-[#262626] md:border md:border-[#262626]">
            {PLANS.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>

          {/* 안내 노트 */}
          <div className="reveal mt-16 max-w-[60ch] mx-auto text-center">
            <div className="eyebrow mb-4">참고</div>
            <p className="text-[14px] md:text-[15px] text-[#8e8e8e] leading-[1.75] ko">
              모든 플랜은 최소 3개월 약정을 권장합니다.
              SEO는 단기 작업으로는 의미 있는 변화를 만들기 어렵기 때문입니다.
              6개월 / 12개월 약정 시 단가 할인이 적용되며, 자세한 조건은 상담 시 안내드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#262626] py-24 md:py-32 bg-[#141414]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
          <h2 className="reveal h-section text-[32px] md:text-[56px] max-w-[20ch] mx-auto text-[#f0f0f0] ko">
            가격보다 먼저<br />
            맞는지부터 보세요
          </h2>
          <p className="reveal mt-6 text-[15px] md:text-[16px] text-[#c8c8c8] max-w-[48ch] mx-auto leading-relaxed ko">
            진단 후 우리가 도와드릴 수 있는 일이 아니라고 판단되면 솔직히 말씀드립니다.
            그게 양쪽 모두에게 가장 합리적입니다.
          </p>
          <Link
            to="/contact"
            className="reveal group mt-10 inline-flex items-center gap-2 h-[52px] px-7 bg-[#f0f0f0] text-[#0a0a0a] rounded-md text-[14.5px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            무료 진단 신청
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className={
        "reveal bg-[#0a0a0a] p-8 md:p-10 flex flex-col " +
        (plan.featured
          ? "border border-[#00ff00] md:border-0 md:relative md:before:absolute md:before:inset-0 md:before:border md:before:border-[#00ff00] md:before:pointer-events-none"
          : "border border-[#262626] md:border-0")
      }
    >
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.02em] ko">
          {plan.name}
        </h3>
        {plan.featured && (
          <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#00ff00]">
            추천
          </span>
        )}
      </div>
      <div className="text-[13px] text-[#8e8e8e] ko mb-8">{plan.tagline}</div>

      {/* 가격 */}
      <div className="mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[40px] md:text-[48px] font-semibold tracking-[-0.04em] tabular-nums leading-none">
            {plan.price}
          </span>
        </div>
        <div className="text-[12px] text-[#5a5a5a] font-mono mt-2">{plan.unit}</div>
      </div>

      <p className="mt-6 text-[14px] text-[#c8c8c8] leading-[1.7] ko">{plan.description}</p>

      {/* 기능 리스트 */}
      <ul className="mt-8 space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[14px] text-[#c8c8c8] ko">
            <Check className="w-4 h-4 text-[#00ff00] flex-shrink-0 mt-1" strokeWidth={2.5} />
            <span className="leading-[1.55]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={plan.cta.to}
        className={
          "mt-10 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md text-[14px] font-medium transition-colors " +
          (plan.featured
            ? "bg-[#f0f0f0] text-[#0a0a0a] hover:bg-[#e0e0e0]"
            : "border border-[#3a3a3a] text-[#f0f0f0] hover:border-[#f0f0f0]")
        }
      >
        {plan.cta.label}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
