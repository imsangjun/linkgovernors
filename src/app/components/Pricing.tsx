import { Link } from "react-router";
import { ArrowUpRight, Check, Percent } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

/**
 * Pricing 페이지
 * - QUICK OVERVIEW: 개별 서비스 단가표 (백링크/티어 링크 + 전문 서비스)
 * - BUNDLE PACKAGES: 묶음 할인 패키지 3종
 *
 * 주의: 가격은 정책에 맞춰 PRICE_TABLES / BUNDLES 값만 수정하면 됩니다.
 */

interface PriceRow {
  name: string;
  price: string; // 예: "₩60,000", "₩550,000~"
  unit: string; // 예: "개", "도메인", "프로젝트"
  badge?: string; // 예: "NEW"
}

interface PriceTable {
  title: string;
  rows: PriceRow[];
}

const PRICE_TABLES: PriceTable[] = [
  {
    title: "전문 서비스",
    rows: [
      { name: "온페이지 SEO 보고서", price: "₩50,000", unit: "회" },
      { name: "온페이지 SEO 대행", price: "₩490,000", unit: "회" },
      { name: "네이버 콘텐츠 SEO", price: "₩50,000", unit: "건" },
      { name: "지역 SEO", price: "₩1,450,000", unit: "프로젝트" },
      { name: "SEO 최적화 웹사이트 제작", price: "₩550,000~", unit: "프로젝트" },
      { name: "Programmatic SEO", price: "₩3,000,000~", unit: "프로젝트", badge: "NEW" },
    ],
  },
];

interface Bundle {
  name: string;
  tagline: string;
  price: string;
  original: string;
  discount: string; // "15%"
  unit: string; // "월"
  features: string[];
  featured?: boolean;
}

const BUNDLES: Bundle[] = [
  {
    name: "LINK STARTER",
    tagline: "링크 빌딩 입문",
    price: "₩450,000",
    original: "₩530,000",
    discount: "15%",
    unit: "월",
    features: [
      "PBN 백링크 5개",
      "Tier 2 링크 200개",
      "Tier 3 링크 1,000개",
      "기본 키워드 분석",
      "월간 성과 리포트",
    ],
  },
  {
    name: "FULL SEO",
    tagline: "종합 SEO 패키지",
    price: "₩990,000",
    original: "₩1,240,000",
    discount: "20%",
    unit: "월",
    features: [
      "PBN 백링크 10개",
      "Tier 2 링크 300개",
      "Tier 3 링크 2,000개",
      "온페이지 SEO 감사 1회",
      "전담 SEO 매니저 배정",
    ],
    featured: true,
  },
  {
    name: "ENTERPRISE",
    tagline: "엔터프라이즈",
    price: "₩2,100,000",
    original: "₩2,800,000",
    discount: "25%",
    unit: "월",
    features: [
      "PBN 백링크 20개",
      "Tier 2/3 풀 피라미드",
      "온페이지 SEO 전면 감사",
      "월간 세부 보고서 제공",
      "AI·LLM 검색 노출 최적화",
    ],
  },
];

export function Pricing() {
  useRevealOnScroll();

  return (
    <>
      {/* QUICK OVERVIEW 단가표 */}
      <section className="pt-20 md:pt-32 pb-20 md:pb-28 border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="reveal eyebrow mb-4">Quick Overview</div>
          <h2 className="reveal h-section text-[28px] md:text-[40px] ko mb-12 md:mb-16">
            한눈에 보는 요금표
          </h2>

          <div className="max-w-[760px]">
            {PRICE_TABLES.map((table) => (
              <PriceTableCard key={table.title} table={table} />
            ))}
          </div>

          <p className="reveal mt-12 text-center text-[13px] text-[#5a5a5a] ko">
            ↓ 각 서비스 상세 내용은 아래에서 확인하세요 · 번들 할인 최대 25%
          </p>
        </div>
      </section>

      {/* BUNDLE PACKAGES */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end mb-12 md:mb-16">
            <div>
              <div className="reveal eyebrow mb-4">Bundle Packages</div>
              <h2 className="reveal h-display text-[44px] sm:text-[64px] md:text-[80px] ko">
                번들 할인
              </h2>
            </div>
            <p className="reveal text-[14px] md:text-[15px] text-[#8e8e8e] leading-[1.7] max-w-[40ch] lg:text-right ko">
              자주 함께 사용되는 서비스를 묶어 할인된 가격에 제공합니다.
              번들 외 서비스를 추가하셔도 됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUNDLES.map((bundle) => (
              <BundleCard key={bundle.name} bundle={bundle} />
            ))}
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

function PriceTableCard({ table }: { table: PriceTable }) {
  return (
    <div className="reveal border border-[#262626] rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[#262626]">
        <h3 className="text-[15px] md:text-[16px] font-semibold text-[#00c800] ko">
          {table.title}
        </h3>
      </div>
      <div>
        {table.rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between gap-4 px-6 py-5 border-b border-[#262626] last:border-b-0 hover:bg-[#141414] transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[14px] md:text-[15px] text-[#f0f0f0] ko truncate">
                {row.name}
              </span>
              {row.badge && (
                <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-mono font-semibold tracking-[0.05em] bg-[#00c800] text-[#0a0a0a] rounded">
                  {row.badge}
                </span>
              )}
            </div>
            <div className="flex-shrink-0 text-[14px] md:text-[15px] tabular-nums">
              <span className="text-[#f0f0f0] font-medium">{row.price}</span>
              <span className="text-[#5a5a5a]">/{row.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <article
      className={
        "reveal relative bg-[#0a0a0a] p-7 md:p-8 flex flex-col rounded-xl " +
        (bundle.featured ? "border-2 border-[#00c800]" : "border border-[#262626]")
      }
    >
      {bundle.featured && (
        <span className="absolute -top-3 left-7 px-2.5 py-1 text-[11px] font-semibold bg-[#00c800] text-[#0a0a0a] rounded ko">
          가장 인기
        </span>
      )}

      {/* 헤더 */}
      <h3 className="text-[20px] md:text-[22px] font-bold tracking-[0.02em] font-mono">
        {bundle.name}
      </h3>
      <div className="mt-1.5 text-[13.5px] text-[#8e8e8e] ko">{bundle.tagline}</div>

      {/* 가격 */}
      <div className="mt-7">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[32px] md:text-[38px] font-semibold tracking-[-0.03em] tabular-nums leading-none text-[#00c800]">
            {bundle.price}
          </span>
          <span className="text-[13px] text-[#8e8e8e]">/{bundle.unit}</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="text-[13px] text-[#5a5a5a] line-through tabular-nums">
            {bundle.original}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-[#00c800]/[0.12] text-[#00c800] rounded ko">
            <Percent className="w-3 h-3" />
            {bundle.discount} 할인
          </span>
        </div>
      </div>

      {/* 기능 리스트 */}
      <ul className="mt-7 space-y-3 flex-1">
        {bundle.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[14px] text-[#c8c8c8] ko">
            <Check className="w-4 h-4 text-[#00c800] flex-shrink-0 mt-[3px]" strokeWidth={2.5} />
            <span className="leading-[1.5]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        className={
          "mt-8 inline-flex items-center justify-center h-12 px-5 rounded-md text-[14px] font-medium transition-colors " +
          (bundle.featured
            ? "bg-[#00c800] text-[#0a0a0a] hover:bg-[#00e000]"
            : "border border-[#3a3a3a] text-[#f0f0f0] hover:border-[#f0f0f0]")
        }
      >
        이 번들로 시작하기
      </Link>
    </article>
  );
}
