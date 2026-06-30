import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

const SERVICES = [
  {
    n: "01",
    title: "웹사이트 제작",
    tagline: "검색에 강한 웹사이트",
    desc:
      "SEO를 나중에 끼워 넣지 않습니다. 처음부터 검색엔진이 읽기 좋은 구조로 웹사이트를 설계하고 제작합니다. 빠른 로딩과 명확한 정보 구조가 기본입니다.",
    bullets: [
      "반응형 디자인 모바일 우선",
      "시맨틱 HTML · 접근성 마크업",
      "Core Web Vitals 기준 성능 설계",
      "검색 친화 정보구조(IA) 설계",
      "블로그 · CMS 연동",
    ],
  },
  {
    n: "02",
    title: "온페이지 SEO 세팅",
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
    title: "백엔드 웹개발",
    tagline: "확장 가능한 기반",
    desc:
      "단순한 페이지를 넘어 데이터와 기능이 필요한 서비스를 위한 백엔드를 개발합니다. API 설계부터 데이터베이스, 배포까지 한 흐름으로 다룹니다.",
    bullets: [
      "REST / API 설계 및 구현",
      "데이터베이스 모델링",
      "인증 · 권한 처리",
      "서버리스 · 클라우드 배포",
      "문의 · 리드 수집 파이프라인",
    ],
  },
  {
    n: "04",
    title: "키워드 클러스터",
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

// 고객 검색 의도 퍼널 — 위에서 아래로 갈수록 전환에 가까워짐
const FUNNEL = [
  { step: "정보 탐색", desc: "서비스·해결책을 학습하는 단계", tag: "블로그 노출" },
  { step: "비교·고민", desc: '"잘하는 곳", "후기" · 업체 비교 중', tag: "전환 핵심" },
  { step: "비용 확인", desc: '"비용", "가격" · 문의 직전', tag: "전환 핵심" },
  { step: "즉시 전환", desc: '"[지역] [업종]" · 바로 예약·문의', tag: "지역 SEO" },
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
            전환을 이끌어내는<br />
            <span className="text-[#8e8e8e]">네 가지 축</span>
          </h1>
          <p className="reveal mt-10 text-[16px] md:text-[18px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
            웹사이트의 토대부터 검색 최적화, 콘텐츠 설계까지. 만드는 단계와
            끌어올리는 단계가 함께 작동할 때 비로소 순위는 흔들리지 않습니다.
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

      {/* 검색 의도 4단계 퍼널 */}
      <section className="border-t border-[#262626] py-20 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <h2 className="reveal h-section text-[26px] md:text-[40px] text-center ko mb-12 md:mb-16">
            고객 검색 의도 <span className="text-[#00c800]">4단계 퍼널</span>
          </h2>

          <div className="relative max-w-[860px] mx-auto pl-9 md:pl-12">
            {/* 좌측 축: 전환에 가까워짐 ↑ */}
            <div className="absolute left-0 top-1 bottom-1 flex flex-col items-center">
              <span className="text-[10px] text-[#5a5a5a] tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 ko">
                전환에 가까워짐
              </span>
              <div className="flex-1 w-px bg-[#262626] my-3" />
              <span className="text-[#00c800] text-[11px] leading-none" aria-hidden>▼</span>
            </div>

            {/* 단계 박스 — 아래로 갈수록 우측 들여쓰기(퍼널) + 순차 등장 */}
            <div className="space-y-3.5">
              {FUNNEL.map((f, i) => (
                <div
                  key={f.step}
                  className="reveal flex items-center justify-between gap-4 rounded-xl border border-[#00c800]/40 bg-[#00c800]/[0.04] px-5 md:px-7 py-4 md:py-5 transition-colors hover:border-[#00c800] hover:bg-[#00c800]/[0.07]"
                  style={{ marginLeft: `${i * 7}%`, animationDelay: `${i * 150}ms` }}
                >
                  <div className="min-w-0">
                    <div className="text-[15px] md:text-[17px] font-semibold tracking-[-0.01em] ko">
                      <span className="text-[#00c800] tabular-nums">{i + 1}.</span> {f.step}
                    </div>
                    <div className="mt-1.5 text-[12.5px] md:text-[14px] text-[#8e8e8e] ko">
                      {f.desc}
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.08em] text-[#5a5a5a]">
                    {f.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
