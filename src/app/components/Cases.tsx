import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

/**
 * Cases 케이스 스터디 페이지
 *
 * 주의: 아래 사례는 구조를 보여주기 위한 예시 템플릿입니다.
 * 실제 클라이언트 사례가 누적되면 CASES 배열의 값을 실제 수치로 교체하세요.
 * - industry / period: 업종, 진행 기간
 * - challenge: 시작 시점의 문제
 * - work: 우리가 한 작업 (3~4개)
 * - metrics: 결과 지표 (label + value + note)
 */

interface CaseMetric {
  label: string;
  value: string;
  note: string;
}

interface CaseStudy {
  tag: string;
  title: string;
  industry: string;
  period: string;
  challenge: string;
  work: string[];
  metrics: CaseMetric[];
}

const CASES: CaseStudy[] = [
  {
    tag: "skarte-rental",
    title: "장비 렌탈 서비스 웹사이트\n제작 & SEO",
    industry: "장비 렌탈",
    period: "2026 진행",
    challenge:
      "오프라인 위주로 운영되던 장비 렌탈 서비스로, 온라인에서 '장비 렌탈' 관련 검색에 거의 노출되지 않았습니다. 잠재 고객이 업체를 찾고 문의로 이어질 디지털 접점 자체가 없는 상태였습니다.",
    work: [
      "SEO를 처음부터 고려한 구조로 렌탈 서비스 웹사이트 신규 제작",
      "장비 카테고리별 키워드 클러스터 설계 품목·용도·지역 단위",
      "온페이지 SEO 세팅 메타 태그, 구조화 데이터, 내부 링크 토폴로지",
      "Core Web Vitals 최적화로 모바일 로딩 속도와 안정성 확보",
    ],
    metrics: [
      { label: "사이트 제작", value: "2주", note: "기획·디자인·개발" },
      { label: "타겟 키워드", value: "30+", note: "장비 렌탈 클러스터" },
      { label: "Core Web Vitals", value: "통과", note: "모바일·데스크톱" },
    ],
  },
  {
    tag: "skarte-film",
    title: "영상 제작사 브랜드\n랜딩페이지 제작 & SEO",
    industry: "영상 제작",
    period: "2026 진행",
    challenge:
      "공연·브랜드필름·광고 영상을 만드는 제작사였지만, 작업물을 한곳에서 보여줄 브랜드 사이트가 없었습니다. 잠재 클라이언트가 포트폴리오를 확인하고 문의로 이어질 온라인 접점이 부족했고, '인천 영상 제작' 같은 지역·서비스 검색에서도 거의 노출되지 않았습니다.",
    work: [
      "브랜드 톤을 담은 영상 제작사 랜딩페이지 신규 제작",
      "포트폴리오 중심 정보 구조 설계 공연·브랜드필름·광고·하이라이트",
      "지역·서비스 키워드 클러스터 설계 인천 영상 제작, 브랜드필름 등",
      "온페이지 SEO + OG·구조화 데이터로 검색·공유 노출 강화",
    ],
    metrics: [
      { label: "사이트 제작", value: "2주", note: "기획·디자인·개발" },
      { label: "타겟 키워드", value: "지역+서비스", note: "영상 제작 클러스터" },
      { label: "Core Web Vitals", value: "통과", note: "모바일·데스크톱" },
    ],
  },
  {
    tag: "corporate-intro",
    title: "기업 소개 페이지\n제작 & SEO",
    industry: "기업 소개",
    period: "2026 진행",
    challenge:
      "사업은 운영되고 있었지만, 회사를 공식적으로 소개하는 온라인 페이지가 없었습니다. 회사명을 검색해도 신뢰할 만한 공식 페이지가 노출되지 않아, 잠재 고객·파트너가 회사의 사업 영역과 연혁을 확인할 접점이 비어 있는 상태였습니다.",
    work: [
      "회사 정체성을 담은 기업 소개 페이지 신규 제작",
      "사업 영역·연혁·핵심 가치·연락처 중심의 정보 구조 설계",
      "회사명·브랜드·산업 키워드 클러스터 설계로 검색 노출 확보",
      "Organization 구조화 데이터 + OG 태그로 브랜드 검색·공유 최적화",
    ],
    metrics: [
      { label: "사이트 제작", value: "2주", note: "기획·디자인·개발" },
      { label: "타겟 키워드", value: "브랜드+산업", note: "기업 소개 클러스터" },
      { label: "Core Web Vitals", value: "통과", note: "모바일·데스크톱" },
    ],
  },
];

export function Cases() {
  useRevealOnScroll();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="reveal eyebrow mb-8">케이스 스터디</div>
          <h1 className="reveal h-display text-[40px] sm:text-[56px] md:text-[80px] max-w-[18ch] ko">
            눈에 보이는 결과로<br />
            <span className="text-[#8e8e8e]">증명합니다</span>
          </h1>
          <p className="reveal mt-10 text-[16px] md:text-[18px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
            각 사례는 시작 시점의 문제, 우리가 실제로 한 작업, 그리고 그 변화가
            어떤 지표로 나타났는지를 같은 구조로 정리합니다. 과장 없이,
            검증 가능한 형태로 기록한 케이스 스터디입니다.
          </p>

          {/* 예시 안내 배너 */}
          <div className="reveal mt-10 inline-flex items-center gap-3 border border-[#262626] bg-[#141414] rounded-lg px-4 py-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c800] flex-shrink-0" />
            <span className="text-[13px] text-[#8e8e8e] ko">
              아래 사례는 <strong className="text-[#c8c8c8] font-medium">모두 실제 진행된 사례</strong>입니다.
            </span>
          </div>
        </div>
      </section>

      {/* Case list */}
      <section className="pt-10 md:pt-12 pb-20 md:pb-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 space-y-8 md:space-y-12">
          {CASES.map((c, i) => (
            <CaseCard key={c.tag} data={c} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#262626] py-24 md:py-32 bg-[#141414]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 text-center">
          <h2 className="reveal h-section text-[32px] md:text-[56px] max-w-[20ch] mx-auto text-[#f0f0f0] ko">
            다음 사례의<br />
            주인공이 되실까요
          </h2>
          <p className="reveal mt-6 text-[15px] md:text-[16px] text-[#c8c8c8] max-w-[48ch] mx-auto leading-relaxed ko">
            도메인 URL만 알려주시면 무료 진단 리포트를 보내드립니다.
            우리가 도와드릴 수 있는 일인지부터 솔직히 말씀드립니다.
          </p>
          <Link
            to="/contact"
            className="reveal group mt-10 inline-flex items-center gap-2 h-[52px] px-7 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[14.5px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            무료 진단 신청
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function CaseCard({ data, index }: { data: CaseStudy; index: number }) {
  const caseNo = `CASE ${String(index + 1).padStart(2, "0")}`;
  return (
    <article
      className="reveal bg-[#0a0a0a] p-8 md:p-12 border border-[#262626] rounded-2xl"
      style={{ animationDelay: `${index * 140}ms` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left: meta */}
        <div className="md:col-span-4">
          <div className="eyebrow tabular-nums text-[#00c800]">{caseNo}</div>
          <h2 className="mt-5 text-[22px] md:text-[28px] font-semibold tracking-[-0.02em] leading-[1.3] ko whitespace-pre-line">
            {data.title}
          </h2>
          <dl className="mt-6 space-y-2 text-[13px]">
            <div className="flex gap-3">
              <dt className="text-[#5a5a5a] w-[52px] flex-shrink-0">업종</dt>
              <dd className="text-[#c8c8c8] ko">{data.industry}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-[#5a5a5a] w-[52px] flex-shrink-0">기간</dt>
              <dd className="text-[#c8c8c8] ko">{data.period}</dd>
            </div>
          </dl>
        </div>

        {/* Right: detail */}
        <div className="md:col-span-8">
          <div>
            <h3 className="eyebrow mb-3">과제</h3>
            <p className="text-[14.5px] md:text-[15px] leading-[1.75] text-[#c8c8c8] ko">
              {data.challenge}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="eyebrow mb-3">작업</h3>
            <ul className="space-y-2">
              {data.work.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[14.5px] text-[#c8c8c8] ko">
                  <span className="mt-[9px] w-1 h-1 rounded-full bg-[#00c800] flex-shrink-0" />
                  <span className="leading-[1.6]">{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#262626] border border-[#262626] rule">
            {data.metrics.map((m) => (
              <div key={m.label} className="bg-[#0a0a0a] p-5">
                <div className="text-[28px] md:text-[34px] font-semibold tracking-[-0.04em] tabular-nums leading-none text-[#f0f0f0]">
                  {m.value}
                </div>
                <div className="mt-2 text-[13px] text-[#c8c8c8] ko">{m.label}</div>
                <div className="mt-1 text-[11px] text-[#5a5a5a] ko">{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
