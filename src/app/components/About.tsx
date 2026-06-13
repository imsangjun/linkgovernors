import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

const PRINCIPLES = [
  {
    n: "01",
    title: "느리지만 누적되는 작업",
    desc:
      "빠른 성과는 빠르게 사라집니다. 우리는 다음 코어 업데이트 후에도 살아남는 구조를 만드는 데 집중합니다. 12개월의 신뢰는 1개월에 만들 수 없습니다.",
  },
  {
    n: "02",
    title: "구글 가이드라인 안에서만",
    desc:
      "PBN, 자동 생성 링크, 댓글 스팸 같은 블랙햇 기법은 사용하지 않습니다. 한때 효과 있던 방법은 구글이 가장 먼저 학습한 패턴입니다.",
  },
  {
    n: "03",
    title: "측정 가능한 약속만",
    desc:
      "막연한 '순위 상승'이 아니라 합의된 KPI 안에서 작업합니다. 우리가 약속할 수 없는 결과는 처음부터 약속하지 않습니다.",
  },
  {
    n: "04",
    title: "투명한 작업 로그",
    desc:
      "모든 링크 확보 내역, 콘텐츠 발행 내역, 기술 변경 내역은 실시간 로그로 남고 매주 공유됩니다. 블랙박스 안에서 일하지 않습니다.",
  },
];

export function About() {
  useRevealOnScroll();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="reveal eyebrow mb-8">회사</div>
          <h1 className="reveal h-display text-[40px] sm:text-[56px] md:text-[80px] max-w-[16ch] ko">
            검색을 신뢰의<br />
            <span className="text-[#8e8e8e]">시장으로</span> 봅니다
          </h1>
          <p className="reveal mt-10 text-[16px] md:text-[18px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
            LinkPresso는 2024년 서울에서 시작했습니다.
            국내외 SEO 에이전시에서 일하던 멤버들이, 더 이상 단기 성과를
            팔지 않기로 결정하면서 만든 팀입니다.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-3">
              <div className="reveal eyebrow">/ 01 — 시작</div>
            </div>
            <div className="md:col-span-9 space-y-8 max-w-[60ch]">
              <p className="reveal text-[18px] md:text-[22px] leading-[1.7] text-[#f0f0f0] tracking-[-0.015em] ko">
                업계에는 두 종류의 일이 있습니다.
                다음 분기에 효과가 사라질 것을 알고도 청구서를 끊는 일,
                그리고 천천히 권위를 누적해 다음 코어 업데이트 후에도 살아남게 하는 일.
              </p>
              <p className="reveal text-[15px] md:text-[16px] leading-[1.75] text-[#c8c8c8] ko">
                전자가 더 잘 팔리는 시장이라는 걸 압니다. 하지만 우리는 후자만
                합니다. 그래서 모든 신규 클라이언트와는 먼저 진단부터 시작합니다.
                도메인을 살펴본 후, 우리가 도와드릴 수 있는 일인지부터 판단합니다.
                도와드릴 수 없는 영역이라면 그 자리에서 거절합니다.
              </p>
              <p className="reveal text-[15px] md:text-[16px] leading-[1.75] text-[#c8c8c8] ko">
                작업이 시작되면 모든 결정의 근거를 공유합니다. 어떤 도메인에서
                링크를 받았는지, 왜 그 도메인을 선택했는지, 다음 분기에 무엇을
                할 계획인지. 클라이언트가 우리의 작업을 이해할 수 있어야,
                혹시 모를 페널티 위험에 함께 대비할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-[#262626] py-24 md:py-32 bg-[#141414]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
            <div className="md:col-span-3">
              <div className="reveal eyebrow">/ 02 — 원칙</div>
            </div>
            <div className="md:col-span-9">
              <h2 className="reveal h-section text-[32px] md:text-[52px] max-w-[18ch] ko">
                우리가 일하는 방식
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#262626] border border-[#262626]">
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="reveal bg-[#1a1a1a] p-8 md:p-12">
                <div className="eyebrow tabular-nums">{p.n}</div>
                <h3 className="mt-6 text-[20px] md:text-[24px] font-semibold tracking-[-0.02em] ko">
                  {p.title}
                </h3>
                <p className="mt-4 text-[14.5px] md:text-[15px] leading-[1.75] text-[#c8c8c8] ko">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Stats */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-3">
              <div className="reveal eyebrow">/ 03 — 팀</div>
            </div>
            <div className="md:col-span-9">
              <h2 className="reveal h-section text-[32px] md:text-[52px] max-w-[18ch] mb-12 ko">
                작은 팀, 깊은 작업
              </h2>
              <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 rule pt-10">
                <Stat num="9명" label="풀타임 멤버" />
                <Stat num="14년" label="평균 SEO 경력" />
                <Stat num="3개국" label="현지 매체 네트워크" />
                <Stat num="≤ 12" label="동시 진행 클라이언트" />
              </div>
              <p className="reveal mt-12 text-[14.5px] md:text-[15px] leading-[1.75] text-[#8e8e8e] max-w-[56ch] ko">
                우리는 동시에 12곳 이상의 클라이언트를 받지 않습니다.
                작업의 깊이를 유지하기 위한 자체 한도입니다.
                이 한도가 차면 다음 분기까지 대기 명단에 올려드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#262626] py-24 md:py-32 bg-[#141414]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
          <h2 className="reveal h-section text-[32px] md:text-[56px] max-w-[20ch] mx-auto text-[#f0f0f0] ko">
            함께 일하실<br />
            준비가 되셨나요
          </h2>
          <Link
            to="/contact"
            className="reveal group mt-10 inline-flex items-center gap-2 h-[52px] px-7 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[14.5px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            상담 요청
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="text-[32px] md:text-[40px] font-semibold tracking-[-0.04em] tabular-nums leading-none">
        {num}
      </div>
      <div className="mt-3 text-[12px] md:text-[13px] text-[#8e8e8e] ko">
        {label}
      </div>
    </div>
  );
}
