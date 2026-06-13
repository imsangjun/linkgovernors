import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

const SERVICES = [
  {
    n: "01",
    title: "백링크 빌딩",
    tagline: "맥락이 있는 인용",
    desc:
      "도메인 권위(DR), 토픽 관련성, 실측 트래픽까지 검증된 매체에서만 인용 링크를 확보합니다. 대량 발송이 아닌, 한 건씩 손으로 협의하는 방식입니다.",
    bullets: [
      "실측 트래픽 1,000+/월 도메인 풀 운영",
      "한국어·영어 네이티브 에디터 직접 작성",
      "nofollow / sponsored 표기 사전 합의",
      "Ahrefs · Semrush 지표 월간 검증",
      "구글 가이드라인 100% 준수 — E-E-A-T 강화",
    ],
  },
  {
    n: "02",
    title: "온페이지 SEO",
    tagline: "기술적 토대",
    desc:
      "기술 SEO 감사부터 콘텐츠 구조, 내부 링크 토폴로지까지. 크롤 예산을 가장 가치 있는 페이지로 흐르게 합니다.",
    bullets: [
      "Core Web Vitals 최적화",
      "스키마 마크업 설계 및 구현",
      "내부 링크 그래프 재설계",
      "사이트 구조와 URL 정리",
      "robots / sitemap 거버넌스",
    ],
  },
  {
    n: "03",
    title: "토픽 클러스터",
    tagline: "의미망 단위 콘텐츠",
    desc:
      "단일 키워드가 아닌 의미망 단위로 콘텐츠를 설계합니다. 허브-스포크 구조로 도메인 전체의 토픽 권위를 끌어올립니다.",
    bullets: [
      "검색 의도 단위 키워드 매핑",
      "허브 페이지 + 스포크 콘텐츠 설계",
      "내부 링크 자동화 권장사항",
      "콘텐츠 캘린더 (분기 단위)",
      "성과 측정 대시보드 연동",
    ],
  },
];

export function Services() {
  useRevealOnScroll();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="reveal eyebrow mb-8">서비스</div>
          <h1 className="reveal h-display text-[40px] sm:text-[56px] md:text-[80px] max-w-[18ch] ko">
            검색 권위를 만드는<br />
            <span className="text-[#8e8e8e]">세 가지 축</span>
          </h1>
          <p className="reveal mt-10 text-[16px] md:text-[18px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
            링크 빌딩만으로는 충분하지 않습니다. 도메인의 신뢰도, 콘텐츠의 깊이,
            기술적 토대가 함께 작동할 때 비로소 순위는 흔들리지 않습니다.
          </p>
        </div>
      </section>

      {/* Services list */}
      {SERVICES.map((s, idx) => (
        <section
          key={s.n}
          className={`py-20 md:py-32 ${idx % 2 === 1 ? "bg-[#141414] border-y border-[#262626]" : ""}`}
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-4">
                <div className="reveal eyebrow tabular-nums mb-6">/ {s.n}</div>
                <h2 className="reveal h-section text-[28px] md:text-[40px] ko">
                  {s.title}
                </h2>
                <div className="reveal mt-3 text-[14px] text-[#8e8e8e] ko">
                  {s.tagline}
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="reveal text-[16px] md:text-[18px] leading-[1.7] text-[#c8c8c8] max-w-[56ch] ko">
                  {s.desc}
                </p>
                <ul className="reveal mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#c8c8c8] py-3 border-b border-[#262626] ko"
                    >
                      <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full bg-[#f0f0f0]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-[#262626] py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
          <h2 className="reveal h-section text-[32px] md:text-[56px] max-w-[20ch] mx-auto ko">
            어떤 축부터 시작할지<br />
            함께 정해드립니다
          </h2>
          <Link
            to="/contact"
            className="reveal group mt-10 inline-flex items-center gap-2 h-[52px] px-7 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[14.5px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            무료 도메인 진단
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
