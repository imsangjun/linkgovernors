import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ArrowRight, Search, Target, Zap, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

export function Home() {
  useRevealOnScroll();

  return (
    <>
      <Hero />
      <ServicesPreview />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}

/* ───────────────────────────────────────────────────
   HERO
   - 첫 화면이 인상이다. 빨간 점은 nav 로고에만 있고
     본문에는 일절 없도록 "온점 1개" 약속 지키기.
─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative reveal">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-20 md:pb-28">
        {/* Display headline */}
        <h1 className="reveal h-display text-3d !leading-[0.92] !tracking-[-0.015em] text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] max-w-[16ch] ko">
          상위 노출은<br />
          우연이 아니라<br />
          <span className="text-[#00c800]">설계의</span> 결과입니다
        </h1>

        {/* Sub */}
        <p className="reveal mt-10 md:mt-14 text-[16px] md:text-[19px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
          LinkPresso는 웹사이트를 만드는 첫 단계부터 검색 노출을 함께 설계합니다.
          구조, 콘텐츠, 페이지의 기술적 토대를 처음부터 SEO 기준으로 잡아,
          단기 순위가 아니라 다음 코어 업데이트 후에도 살아남는 검색 자산을 만듭니다.
        </p>

        {/* CTAs */}
        <div className="reveal mt-12 md:mt-14 flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 h-[52px] px-7 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[14.5px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            무료 도메인 진단
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 h-[52px] px-7 border border-[#f0f0f0] text-[#f0f0f0] rounded-full text-[14.5px] font-medium hover:bg-[#141414] transition-colors"
          >
            서비스 보기
          </Link>
        </div>

        {/* Stats 실적 수치 */}
        <div className="reveal mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#262626] border border-[#262626]">
          <Stat value="2주" label="웹사이트 제작 평균 소요 시간" />
          <Stat countTo={98} suffix="%" label="고객 만족도" />
          <Stat countTo={46} suffix="건" label="진행한 온페이지 SEO 세팅" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  countTo,
  suffix,
  label,
}: {
  value?: string;
  countTo?: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="relative bg-gradient-to-b from-[#181818] to-[#0a0a0a] p-7 md:p-8 ring-1 ring-inset ring-white/[0.04] transition-transform duration-300 hover:-translate-y-0.5">
      <div className="text-[38px] md:text-[48px] font-semibold tracking-[-0.04em] leading-none tabular-nums text-[#00c000]">
        {countTo != null ? <CountUp target={countTo} suffix={suffix} /> : value}
      </div>
      <div className="mt-3 text-[13.5px] text-[#8e8e8e] ko">{label}</div>
    </div>
  );
}

/**
 * 0에서 목표값까지 빠르게 올라가는 카운트업.
 * 뷰포트에 들어올 때 1회 재생. reduced-motion 시 즉시 최종값.
 */
function CountUp({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started) return;
        started = true;
        io.unobserve(entry.target);

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic 빠르게 시작
          setDisplay(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ───────────────────────────────────────────────────
   ABOUT 소개 — 우리가 무엇을 하는 팀인지
   링크어소리티풍 무게감 (한국어 타이포 위주)
─────────────────────────────────────────────────── */
function About() {
  return (
    <section className="border-t border-[#262626] py-24 md:py-40 reveal">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-12">
            <h2 className="reveal h-section text-3d text-[32px] md:text-[52px] lg:text-[60px] max-w-[18ch] ko">
              LinkPresso는 검색 성장을
              설계하는 팀입니다.
            </h2>
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div className="reveal">
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#c8c8c8] ko">
                  우리는 웹사이트 제작부터 온페이지 SEO, 백엔드 개발,
                  키워드 클러스터 설계까지 검색 노출에 필요한 모든 축을
                  한 팀에서 다룹니다. 흩어진 외주를 조율할 필요 없이
                  토대부터 콘텐츠까지 하나의 기준으로 만듭니다.
                </p>
              </div>
              <div className="reveal">
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#c8c8c8] ko">
                  목표는 반짝 순위가 아닙니다. 실측 트래픽이 있는 매체의
                  맥락 있는 인용, 토픽이 일치하는 도메인의 권위, 검색엔진이
                  읽기 좋은 기술적 구조 코어 업데이트 후에도 살아남는
                  검색 자산을 쌓는 것이 우리가 하는 일입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────
   SERVICES PREVIEW
─────────────────────────────────────────────────── */
function ServicesPreview() {
  const services = [
    {
      n: "01",
      title: "웹사이트 제작",
      desc: "SEO를 처음부터 고려한 구조로 웹사이트를 설계·제작합니다. 빠른 로딩, 명확한 정보 구조, 검색엔진이 읽기 좋은 마크업이 기본입니다.",
    },
    {
      n: "02",
      title: "온페이지 SEO 세팅",
      desc: "기술 SEO 감사부터 콘텐츠 구조, 내부 링크 토폴로지까지. 크롤 예산을 가장 가치 있는 페이지로 흐르게 합니다.",
    },
    {
      n: "03",
      title: "백엔드 웹개발",
      desc: "데이터와 기능이 필요한 서비스를 위한 백엔드를 개발합니다. API 설계부터 데이터베이스, 배포까지 한 흐름으로 다룹니다.",
    },
    {
      n: "04",
      title: "키워드 클러스터",
      desc: "단일 키워드가 아닌 의미망 단위로 콘텐츠를 설계합니다. 허브-스포크 구조로 도메인 전체의 토픽 권위를 끌어올립니다.",
    },
    {
      n: "05",
      title: "도메인 구매 대행",
      desc: "브랜드와 검색에 유리한 도메인을 찾고 구매·이전을 대신 처리합니다. 만료 도메인의 기존 권위까지 검토해 가장 가치 있는 출발점을 확보합니다.",
    },
  ];

  const tags: Record<string, string[]> = {
    "01": ["RESPONSIVE", "CORE WEB VITALS"],
    "02": ["TECHNICAL SEO", "SCHEMA"],
    "03": ["REST API", "CLOUD DEPLOY"],
    "04": ["HUB & SPOKE", "SEARCH INTENT"],
    "05": ["EXPIRED DOMAIN", "DNS SETUP"],
  };

  return (
    <section className="border-t border-[#262626] py-24 md:py-32 reveal">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <h2 className="reveal h-display text-3d text-[44px] sm:text-[64px] md:text-[84px] leading-[0.9] tracking-[-0.03em]">
            CORE<br />SERVICES
          </h2>
          <Link
            to="/services"
            className="reveal group inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.08em] text-[#00c800] hover:gap-3 transition-all"
          >
            전체 서비스 보기
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Service grid — 각 카드는 서비스 페이지의 해당 섹션으로 이동 */}
        <div className="border-t border-[#262626] grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          {services.map((s) => (
            <Link
              key={s.n}
              to={`/services#service-${s.n}`}
              className="reveal group block border-b border-[#262626] py-8 md:py-9"
            >
              <div className="flex gap-5 md:gap-7">
                <span className="pt-1.5 text-[11px] font-mono text-[#5a5a5a] tabular-nums">{s.n}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[21px] md:text-[26px] font-bold tracking-[-0.02em] text-[#f0f0f0] group-hover:text-white transition-colors ko">
                      {s.title}
                    </h3>
                    <ArrowUpRight className="mt-1 w-5 h-5 flex-shrink-0 text-[#3a3a3a] group-hover:text-[#00c800] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="mt-2 text-[14px] text-[#8e8e8e] leading-[1.6] ko">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(tags[s.n] ?? []).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-[10px] font-mono uppercase tracking-[0.06em] border border-[#262626] text-[#5a5a5a] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────
   PROCESS
─────────────────────────────────────────────────── */
function Process() {
  const steps: { icon: LucideIcon; title: string; desc: string }[] = [
    {
      icon: Search,
      title: "도메인 진단",
      desc: "현재 백링크 프로필, 토픽 권위, 기술적 이슈를 14개 지표로 스캔합니다. 약점이 어디에 있는지부터.",
    },
    {
      icon: Target,
      title: "전략 설계",
      desc: "경쟁사 갭 분석을 거쳐 분기별 KPI와 키워드 우선순위를 합의합니다. 막연한 목표는 두지 않습니다.",
    },
    {
      icon: Zap,
      title: "실행",
      desc: "링크 확보, 콘텐츠 발행, 기술 개선을 동시에. 모든 작업은 로그로 남고 매주 공유됩니다.",
    },
    {
      icon: RefreshCw,
      title: "검증과 반복",
      desc: "월간 리포트로 ROI를 가시화합니다. 효과 없는 채널은 즉시 중단, 잘 되는 패턴은 두 배로.",
    },
  ];

  return (
    <section className="border-t border-[#262626] bg-[#141414] py-24 md:py-32 reveal">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="mb-16">
          <h2 className="reveal h-display text-3d text-[40px] sm:text-[56px] md:text-[72px] tracking-[-0.03em]">
            Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#262626] border border-[#262626]">
          {steps.map((s) => (
            <div key={s.title} className="reveal bg-[#0a0a0a] p-8 md:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#202020] to-[#0d0d0d] border border-[#2e2e2e] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)]">
                <s.icon className="w-7 h-7 md:w-8 md:h-8 text-[#00c800] drop-shadow-[0_0_8px_rgba(0,200,0,0.35)]" strokeWidth={2} />
              </div>
              <div className="mt-8 h-px w-8 bg-[#3a3a3a]" />
              <h4 className="mt-8 text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] text-[#f0f0f0] ko">
                {s.title}
              </h4>
              <p className="mt-3 text-[14px] text-[#8e8e8e] leading-[1.7] ko">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────
   FAQ
─────────────────────────────────────────────────── */
// FAQ 데이터 화면 렌더와 FAQPage 구조화 데이터(JSON-LD)가 같은 소스를 공유
const FAQ_ITEMS = [
  {
    q: "링크프레소는 어떤 서비스를 제공하나요?",
    a: "SEO와 웹사이트 개발을 전문으로 하는 에이전시입니다. 검색에서 상위 노출되어 실제 문의로 이어지는 웹 환경을 구축합니다.",
  },
  {
    q: "SEO 효과는 언제부터 나타나나요?",
    a: "일반적으로 3개월 전후부터 순위 변화가 보이며, 6개월 이상 관리할 때 안정적으로 자리잡습니다.",
  },
  {
    q: "기존 사이트도 SEO 개선이 가능한가요?",
    a: "가능합니다. 진단 리포트를 먼저 드린 뒤 현재 자산을 최적화하는 방향으로 진행합니다.",
  },
  {
    q: "제작과 SEO를 따로 의뢰할 수 있나요?",
    a: "각각 별도로 가능합니다. 다만 신규 제작 시에는 통합 진행을 권해 드립니다.",
  },
  {
    q: "진행 상황과 성과는 어떻게 확인하나요?",
    a: "키워드 순위, 검색 유입, 전환 데이터를 정기 리포트로 공유해 드립니다.",
  },
  {
    q: "비용은 어떻게 책정되나요?",
    a: "작업 범위에 따라 달라집니다. 무료 진단 후 필요한 작업만 담은 맞춤 견적을 드립니다.",
  },
  {
    q: "계약 종료 후에도 순위가 유지되나요?",
    a: "쌓인 콘텐츠와 백링크는 자산으로 남아 효과가 지속됩니다. 다만 지속 관리가 유리합니다.",
  },
];

function FAQ() {
  // FAQPage 구조화 데이터 구글 리치 결과(FAQ) 대상
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="border-t border-[#262626] py-24 md:py-32 reveal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <h2 className="reveal h-section text-3d text-[26px] md:text-[40px] text-center mb-12 ko">자주 묻는 질문</h2>

        <div className="max-w-[800px] mx-auto">
          {FAQ_ITEMS.map((item, idx) => (
            <FaqItem key={idx} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group reveal border-b border-[#262626] first:border-t">
      <summary className="flex items-center justify-between py-7 cursor-pointer list-none">
        <span className="text-[16px] md:text-[18px] font-medium tracking-[-0.015em] pr-6 ko">
          {q}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#f0f0f0] flex items-center justify-center transition-all group-open:bg-[#f0f0f0] group-open:text-[#0a0a0a]">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="transition-transform group-open:rotate-45"
          >
            <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="pb-7 pr-12 text-[14.5px] md:text-[15px] leading-[1.75] text-[#c8c8c8] ko">
        {a}
      </div>
    </details>
  );
}

/* ───────────────────────────────────────────────────
   CTA
─────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="border-t border-[#262626] py-24 md:py-40 bg-[#141414] reveal">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
        <h2 className="reveal h-section text-3d text-[36px] md:text-[64px] lg:text-[80px] max-w-[18ch] mx-auto ko">
          10분이면 충분합니다
        </h2>
        <p className="reveal mt-8 text-[15px] md:text-[17px] text-[#c8c8c8] max-w-[48ch] mx-auto leading-relaxed ko">
          도메인 주소 하나면 됩니다. 지금 어디가 막혀 있는지, 무료로 짚어드립니다.
        </p>
        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 h-[56px] px-8 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[15px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            무료 진단 신청
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
