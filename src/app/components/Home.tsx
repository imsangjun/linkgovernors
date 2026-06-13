import { Link } from "react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";
import { StringMesh } from "./StringMesh";

export function Home() {
  useRevealOnScroll();

  return (
    <>
      <Hero />
      <StringMesh />
      <Philosophy />
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
     본문에는 일절 없도록 — "온점 1개" 약속 지키기.
─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-20 md:pb-28">
        {/* Eyebrow */}
        <div className="reveal mb-8 md:mb-12">
          <span className="inline-flex items-center gap-3 eyebrow">
            <span aria-hidden>[</span>
            <span>SEO · 백링크 · 웹페이지</span>
            <span className="h-px w-6 bg-[#f0f0f0]" />
            <span>실행 전문</span>
            <span aria-hidden>]</span>
          </span>
        </div>

        {/* Display headline */}
        <h1 className="reveal h-display !leading-[0.92] text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] max-w-[16ch] ko">
          검색 권위는<br />
          우연이 아니라<br />
          <span className="text-[#8e8e8e]">설계의</span> 결과입니다
        </h1>

        {/* Sub */}
        <p className="reveal mt-10 md:mt-14 text-[16px] md:text-[19px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
          LinkPresso는 백링크 한 건 한 건의 맥락,
          도메인의 토픽 권위, 페이지의 기술적 토대를 함께 다룹니다.
          단기 순위가 아니라 다음 코어 업데이트 후에도 살아남는 구조를 만듭니다.
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
            to="/about"
            className="inline-flex items-center gap-2 h-[52px] px-7 border border-[#f0f0f0] text-[#f0f0f0] rounded-full text-[14.5px] font-medium hover:bg-[#141414] transition-colors"
          >
            팀 알아보기
          </Link>
        </div>

        {/* Pledges — 신생업체 톤: 실적 자랑 대신 약속의 명료함 */}
        <div className="reveal mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#262626] border border-[#262626]">
          <Pledge
            title="블랙햇은 쓰지 않습니다"
            desc="PBN, 자동 링크, 댓글 스팸 — 한때 효과 있던 방법은 이미 페널티 대상입니다."
          />
          <Pledge
            title="모든 작업을 공유합니다"
            desc="어떤 도메인에서 링크를 받았는지, 왜 그 도메인을 골랐는지 모두 로그로 남깁니다."
          />
          <Pledge
            title="안 되는 일은 거절합니다"
            desc="진단 결과 우리가 도와드릴 수 없는 영역이라면 그 자리에서 솔직히 말씀드립니다."
          />
        </div>
      </div>
    </section>
  );
}

function Pledge({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#1a1a1a] p-7 md:p-8">
      <h3 className="text-[16px] md:text-[17px] font-semibold tracking-[-0.015em] ko">{title}</h3>
      <p className="mt-3 text-[13.5px] text-[#8e8e8e] leading-[1.7] ko">{desc}</p>
    </div>
  );
}

/* ───────────────────────────────────────────────────
   PHILOSOPHY — 진중한 미디엄 카피 섹션
   링크어소리티풍 무게감 (한국어 타이포 위주)
─────────────────────────────────────────────────── */
function Philosophy() {
  return (
    <section className="py-24 md:py-40">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3">
            <div className="eyebrow">/ 01 — 철학</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="reveal h-section text-[32px] md:text-[52px] lg:text-[60px] max-w-[18ch] ko">
              검색은 신뢰의 시장입니다.
              우리는 신뢰를 짧게 빌리지 않습니다.
            </h2>
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div className="reveal">
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#c8c8c8] ko">
                  많은 SEO 업체가 빠른 순위 상승을 약속합니다.
                  대부분의 약속은 다음 알고리즘 업데이트에서 회수됩니다.
                  자동 생성 링크, 임대 PBN, 댓글 스팸 — 한때 효과가 있었던
                  방법은 구글이 가장 먼저 학습한 패턴입니다.
                </p>
              </div>
              <div className="reveal">
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#c8c8c8] ko">
                  우리는 다른 길을 택했습니다. 실측 트래픽이 있는 매체에
                  맥락이 있는 인용을, 토픽이 일치하는 도메인에 진짜 정보를.
                  속도는 느리지만 누적되고, 누적된 권위는 쉽게 무너지지 않습니다.
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
      title: "백링크 빌딩",
      desc: "도메인 권위, 토픽 관련성, 실측 트래픽까지 검증된 매체에서만 인용 링크를 확보합니다. 대량 발송이 아닌 손으로 협의하는 방식입니다.",
    },
    {
      n: "02",
      title: "온페이지 SEO",
      desc: "기술 SEO 감사부터 콘텐츠 구조, 내부 링크 토폴로지까지. 크롤 예산을 가장 가치 있는 페이지로 흐르게 합니다.",
    },
    {
      n: "03",
      title: "토픽 클러스터",
      desc: "단일 키워드가 아닌 의미망 단위로 콘텐츠를 설계합니다. 허브-스포크 구조로 도메인 전체의 토픽 권위를 끌어올립니다.",
    },
  ];

  return (
    <section className="border-t border-[#262626] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
          <div className="md:col-span-3">
            <div className="eyebrow">/ 02 — 서비스</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="reveal h-section text-[32px] md:text-[52px] max-w-[18ch] ko">
              세 가지 축을 동시에 다룹니다
            </h2>
            <p className="reveal mt-6 text-[15px] md:text-[16px] text-[#8e8e8e] max-w-[56ch] leading-relaxed ko">
              하나만 잘해서는 충분하지 않습니다. 링크와 콘텐츠와 기술적 토대가
              함께 작동할 때 비로소 순위는 흔들리지 않습니다.
            </p>
          </div>
        </div>

        <div className="rule">
          {services.map((s) => (
            <Link
              key={s.n}
              to="/services"
              className="reveal group block py-10 md:py-12 border-b border-[#262626] hover:bg-[#141414] transition-colors -mx-5 md:-mx-8 px-5 md:px-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-baseline">
                <div className="md:col-span-2 eyebrow tabular-nums">{s.n}</div>
                <h3 className="md:col-span-4 text-[24px] md:text-[32px] font-semibold tracking-[-0.025em] ko">
                  {s.title}
                </h3>
                <p className="md:col-span-5 text-[14.5px] md:text-[15px] text-[#8e8e8e] leading-[1.7] ko">
                  {s.desc}
                </p>
                <div className="md:col-span-1 flex md:justify-end">
                  <ArrowRight className="w-5 h-5 text-[#5a5a5a] group-hover:text-[#f0f0f0] group-hover:translate-x-1 transition-all" />
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
  const steps = [
    {
      n: "i",
      title: "도메인 진단",
      desc: "현재 백링크 프로필, 토픽 권위, 기술적 이슈를 14개 지표로 스캔합니다. 약점이 어디에 있는지부터.",
    },
    {
      n: "ii",
      title: "전략 설계",
      desc: "경쟁사 갭 분석을 거쳐 분기별 KPI와 키워드 우선순위를 합의합니다. 막연한 목표는 두지 않습니다.",
    },
    {
      n: "iii",
      title: "실행",
      desc: "링크 확보, 콘텐츠 발행, 기술 개선을 동시에. 모든 작업은 로그로 남고 매주 공유됩니다.",
    },
    {
      n: "iv",
      title: "검증과 반복",
      desc: "월간 리포트로 ROI를 가시화합니다. 효과 없는 채널은 즉시 중단, 잘 되는 패턴은 두 배로.",
    },
  ];

  return (
    <section className="border-t border-[#262626] bg-[#141414] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
          <div className="md:col-span-3">
            <div className="eyebrow">/ 03 — 프로세스</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="reveal h-section text-[32px] md:text-[52px] max-w-[18ch] ko">
              측정에서 시작해<br />
              측정으로 끝납니다
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#262626] border border-[#262626]">
          {steps.map((s) => (
            <div key={s.n} className="reveal bg-[#0a0a0a] p-8 md:p-10">
              <div className="text-[64px] md:text-[80px] leading-none font-semibold tracking-[-0.05em] text-[#f0f0f0]">
                {s.n}
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
function FAQ() {
  const items = [
    {
      q: "신생업체인데 믿고 맡겨도 되나요?",
      a: "회사는 새롭지만 멤버들은 SEO 업계에서 수년간 일한 사람들입니다. 신생업체이기 때문에 가능한 강점도 있습니다. 동시에 많은 클라이언트를 받지 않아 한 곳에 더 집중할 수 있고, 합리적인 초기 가격으로 시작할 수 있습니다. 무엇보다 지금 우리에게 가장 중요한 건 첫 클라이언트들과의 결과입니다. 그래서 더 진지하게 일합니다.",
    },
    {
      q: "구글 페널티 위험은 없나요?",
      a: "모든 작업은 구글 검색 가이드라인 안에서 진행됩니다. PBN, 사설 링크 팜, 자동 생성 댓글 같은 블랙햇 기법은 사용하지 않습니다. 대신 시간이 걸리더라도 실측 트래픽이 있는 도메인에서 자연스러운 인용 링크를 확보합니다.",
    },
    {
      q: "효과는 언제부터 보이나요?",
      a: "롱테일 키워드는 보통 6~10주 안에 순위 변동이 시작됩니다. 경쟁이 강한 헤드 키워드는 4~9개월을 잡으셔야 합니다. 빠른 성과를 약속하는 곳은 대부분 단기적 수단을 사용하고, 그 결과는 다음 코어 업데이트에서 회수됩니다.",
    },
    {
      q: "계약 기간이 정해져 있나요?",
      a: "최소 3개월 단위입니다. SEO는 누적되어야 효과가 나오는 작업이라, 1개월 단위 계약은 양쪽 모두에게 의미 있는 결과를 만들기 어렵습니다. 6개월·12개월 약정 시 단가 할인이 적용됩니다.",
    },
    {
      q: "어떤 산업에서 일해보셨나요?",
      a: "멤버들은 이전 직장에서 B2B SaaS, 핀테크, 이커머스, 헬스케어, 법무·세무, 교육 분야의 SEO를 다뤄봤습니다. 도박·성인·의약품 직접 판매처럼 우리가 구조적으로 도와드릴 수 없는 영역은 처음부터 거절합니다.",
    },
    {
      q: "리포트는 어떻게 받나요?",
      a: "전용 대시보드에 매일 자동 업데이트되며, 매주 또는 매월 정리된 PDF 리포트를 받게 됩니다. 키워드 순위, 백링크 변동, 트래픽 변화, 다음 액션을 한 페이지에 정리합니다.",
    },
  ];

  return (
    <section className="border-t border-[#262626] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12">
          <div className="md:col-span-3">
            <div className="eyebrow">/ 04 — 자주 묻는 질문</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="reveal h-section text-[32px] md:text-[52px] max-w-[18ch] ko">
              먼저 듣고 싶을 만한 것들
            </h2>
          </div>
        </div>

        <div className="md:col-start-4 md:col-span-9 max-w-[800px] md:ml-auto">
          {items.map((item, idx) => (
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
    <section className="border-t border-[#262626] py-24 md:py-40 bg-[#141414]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
        <h2 className="reveal h-section text-[36px] md:text-[64px] lg:text-[80px] max-w-[18ch] mx-auto ko">
          15분이면 충분합니다
        </h2>
        <p className="reveal mt-8 text-[15px] md:text-[17px] text-[#c8c8c8] max-w-[48ch] mx-auto leading-relaxed ko">
          도메인 URL만 알려주시면 무료 진단 리포트를 보내드립니다.
          설득은 그 다음 이야기해도 늦지 않습니다.
        </p>
        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 h-[56px] px-8 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[15px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            무료 진단 신청
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 h-[56px] px-8 border border-[#f0f0f0] text-[#f0f0f0] rounded-full text-[15px] font-medium hover:bg-[#141414] transition-colors"
          >
            팀 알아보기
          </Link>
        </div>
      </div>
    </section>
  );
}
