import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

/**
 * Blog 페이지 - 카테고리 필터 + 검색 + 썸네일 리스트
 *
 * 향후 글 추가 방법:
 * 1. 아래 POSTS 배열에 새 객체 추가 (category는 CATEGORIES 중 하나로)
 * 2. 또는 별도 데이터 파일(blog-posts.ts)로 분리한 뒤 import
 * 3. 본격 운영 시 MDX, Contentlayer, 또는 헤드리스 CMS(Notion API, Sanity 등) 도입 고려
 *
 * 썸네일은 외부 이미지 에셋 없이 카테고리별 인라인 SVG로 생성됩니다.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  readingTime: string; // 예: "18분"
  body?: ContentBlock[]; // 본문 (없으면 상세 페이지에서 "준비 중" 처리)
}

// "전체"는 항상 맨 앞 고정. 나머지는 노출 순서.
const CATEGORIES = [
  "전체",
  "링크빌딩",
  "SEO 전략",
  "백링크",
  "SEO 기초",
  "SEO 트렌드",
  "온페이지 SEO",
  "SEO 도구",
] as const;

export const POSTS: BlogPost[] = [
  {
    slug: "equipment-rental-website-seo",
    title: "장비 렌탈 업체 홈페이지 제작 + SEO로 온라인 문의 만드는 법",
    excerpt:
      "오프라인 위주이던 장비 렌탈 서비스가 '장비 렌탈' 검색에서 발견되기까지. SEO를 고려한 웹사이트 제작, 품목·용도·지역 키워드 클러스터, 온페이지 세팅으로 디지털 접점을 만든 실제 사례를 정리했습니다.",
    category: "SEO 전략",
    date: "2026-06-29",
    readingTime: "10분",
    body: [
      { type: "p", text: "오프라인 영업과 전화 문의에 의존하던 장비 렌탈 업체에게 ‘온라인에서 발견되는 것’은 더 이상 선택이 아닙니다. 잠재 고객은 필요한 장비를 검색창에 먼저 입력합니다. 이 글은 홈페이지 제작과 SEO를 한 흐름으로 묶어 디지털 문의 경로를 만든 과정을 정리합니다." },
      { type: "h2", text: "왜 홈페이지부터 다시 봐야 했나" },
      { type: "p", text: "기존에 블로그나 SNS는 있었지만, 정작 ‘장비 렌탈’을 검색했을 때 노출되는 자사 페이지가 없었습니다. 검색엔진이 색인할 수 있는 구조화된 페이지, 즉 품목·지역·용도가 명확히 정리된 홈페이지가 모든 작업의 출발점이었습니다." },
      { type: "h2", text: "검색을 고려한 웹사이트 제작" },
      { type: "p", text: "보기 좋은 페이지가 아니라, 검색엔진이 읽기 좋은 구조를 처음부터 설계했습니다." },
      { type: "ul", items: [
        "품목별 개별 페이지 — 각 장비가 독립 URL과 제목을 갖도록",
        "지역·용도 키워드를 정보구조(IA)에 반영",
        "빠른 로딩과 모바일 우선 — 현장에서 폰으로 검색하는 고객 대응",
        "모든 페이지에 문의 폼과 전화 연결 배치",
      ] },
      { type: "h2", text: "키워드 클러스터로 검색 의도 덮기" },
      { type: "p", text: "‘장비 렌탈’이라는 단일 키워드만 노리지 않았습니다. ‘품목명 렌탈’, ‘지역명 장비 대여’, ‘행사 장비 렌탈’처럼 의도가 다른 검색을 허브·스포크 구조로 묶어 도메인 전체의 토픽 권위를 쌓았습니다." },
      { type: "quote", text: "홈페이지 제작과 SEO는 분리된 작업이 아닙니다. 검색에 강한 구조 위에 콘텐츠를 얹을 때 비로소 ‘검색에서 문의로’ 이어지는 경로가 완성됩니다." },
    ],
  },
  {
    slug: "search-intent-content-match",
    title: "검색 의도 4가지와 콘텐츠 매칭: 순위의 8할은 여기서 갈린다",
    excerpt:
      "정보형·탐색형·거래형·이동형. 같은 키워드라도 의도가 다르면 노려야 할 콘텐츠 형태가 달라집니다. 의도를 읽고 콘텐츠를 맞추는 실전 프레임을 정리했습니다.",
    category: "SEO 기초",
    date: "2026-06-27",
    readingTime: "9분",
    body: [
      { type: "p", text: "같은 키워드를 노려도 결과가 갈리는 이유는 대개 ‘검색 의도’를 잘못 읽었기 때문입니다. 사용자가 그 검색어로 무엇을 원하는지에 따라, 노출되어야 할 콘텐츠의 형태가 완전히 달라집니다." },
      { type: "h2", text: "검색 의도의 네 가지 유형" },
      { type: "ul", items: [
        "정보형(Informational) — ‘백링크란’처럼 알고 싶은 검색",
        "탐색형(Navigational) — 특정 브랜드·사이트를 찾는 검색",
        "거래형(Transactional) — ‘SEO 대행 견적’처럼 행동 직전의 검색",
        "상업적 조사형(Commercial) — ‘A vs B 비교’처럼 구매 전 비교",
      ] },
      { type: "h2", text: "의도가 콘텐츠 형태를 결정한다" },
      { type: "p", text: "정보형 검색에 판매 페이지를 들이밀면 이탈합니다. 반대로 거래형 검색에 긴 설명 글을 노출하면 전환을 놓칩니다. 의도에 맞는 형태(가이드·비교표·랜딩·도구)를 매칭하는 것이 핵심입니다." },
      { type: "h2", text: "의도를 읽는 가장 확실한 방법" },
      { type: "p", text: "추측하지 말고 검색 결과(SERP)를 직접 보세요. 구글이 1페이지에 어떤 형태의 페이지를 올려놨는지가 곧 ‘구글이 판단한 그 키워드의 의도’입니다. 상위 10개가 전부 리스트형 글이라면, 우리도 그 형태로 맞춰야 경쟁이 됩니다." },
      { type: "quote", text: "키워드를 고르기 전에 의도를 먼저 정하세요. 순위의 8할은 이 단계에서 갈립니다." },
    ],
  },
  {
    slug: "internal-linking-rankings",
    title: "내부 링크만 손봐도 순위가 오르는 이유",
    excerpt:
      "새 백링크 한 줄 없이도 기존 페이지의 순위를 끌어올리는 가장 저평가된 작업, 내부 링크. 링크 주스 흐름과 앵커 텍스트 설계를 사례로 설명합니다.",
    category: "링크빌딩",
    date: "2026-06-24",
    readingTime: "11분",
  },
  {
    slug: "title-meta-description-ctr",
    title: "타이틀 태그와 메타 디스크립션, 클릭률을 바꾸는 작성법",
    excerpt:
      "순위가 같아도 CTR이 2배 차이 나는 이유는 스니펫에 있습니다. 구글이 다시 쓰지 않는 타이틀, 클릭을 부르는 디스크립션 패턴을 정리했습니다.",
    category: "온페이지 SEO",
    date: "2026-06-20",
    readingTime: "8분",
    body: [
      { type: "p", text: "순위가 같아도 클릭률(CTR)이 2배 차이 나는 일은 흔합니다. 그 차이는 검색 결과에 보이는 스니펫, 즉 타이틀 태그와 메타 디스크립션에서 만들어집니다." },
      { type: "h2", text: "타이틀 태그: 순위와 클릭을 동시에" },
      { type: "p", text: "타이틀은 가장 강력한 온페이지 요소 중 하나이면서, 검색 결과에서 가장 먼저 읽히는 문구입니다. 키워드를 앞쪽에 두되, 사람이 클릭하고 싶게 쓰는 균형이 중요합니다." },
      { type: "ul", items: [
        "핵심 키워드를 앞쪽 30자 안에 배치",
        "60자 내외로 — 잘리지 않게",
        "숫자·연도·괄호로 구체성 부여 (예: 2026, [완전판])",
        "페이지마다 고유하게 — 중복 타이틀 금지",
      ] },
      { type: "h2", text: "메타 디스크립션: 순위 요인은 아니지만 클릭 요인" },
      { type: "p", text: "디스크립션은 직접적인 순위 요인이 아니지만, 클릭을 유도해 간접적으로 순위에 영향을 줍니다. 페이지가 답하는 핵심 이득을 한두 문장으로 약속하세요. 150자 내외가 안전합니다." },
      { type: "h2", text: "구글이 내 타이틀을 다시 쓰는 이유" },
      { type: "p", text: "구글은 검색어와 맞지 않거나 키워드를 욱여넣은 타이틀을 종종 자체적으로 고쳐 씁니다. 다시 쓰이지 않으려면, 페이지 내용과 일치하고 과장 없는 타이틀을 다는 것이 가장 확실합니다." },
      { type: "quote", text: "타이틀과 디스크립션은 ‘작은 광고 카피’입니다. 순위를 올리기 전에, 같은 순위에서 더 많은 클릭을 가져오세요." },
    ],
  },
  {
    slug: "google-search-console-reports",
    title: "구글 서치 콘솔, 100% 활용하는 7가지 리포트",
    excerpt:
      "대부분 '클릭 수'만 보고 닫는 서치 콘솔. 색인 커버리지, 검색어, 페이지 경험까지 실무에서 바로 쓰는 7개 리포트 활용법을 정리했습니다.",
    category: "SEO 도구",
    date: "2026-06-17",
    readingTime: "12분",
  },
  {
    slug: "how-to-build-backlinks-2026",
    title: "백링크 만드는 방법: 2026 실전 완전 가이드",
    excerpt:
      "백링크 만드는 방법을 단계별로 정리했습니다. 타겟 키워드 연관 글로 앵커 텍스트를 만드는 법부터 내부 링크 최적화, 1000개 발행 스케줄까지 실전 노하우를 공개합니다.",
    category: "링크빌딩",
    date: "2026-06-11",
    readingTime: "18분",
    body: [
      { type: "p", text: "백링크는 다른 사이트가 내 페이지를 가리키는 링크입니다. 구글은 이 링크를 ‘추천’으로 해석하고, 신뢰할 수 있는 도메인에서 받은 추천일수록 순위에 더 크게 반영됩니다. 문제는 ‘어떻게 자연스럽게, 안전하게 받느냐’입니다." },
      { type: "h2", text: "1단계 — 받을 자격이 있는 페이지부터 만든다" },
      { type: "p", text: "링크를 받을 콘텐츠가 부실하면 어떤 아웃리치도 통하지 않습니다. 인용하고 싶은 데이터, 정리된 가이드, 도구처럼 ‘참조할 이유가 있는’ 페이지를 먼저 갖춰야 합니다." },
      { type: "h2", text: "2단계 — 링크할 이유가 있는 콘텐츠 유형" },
      { type: "ul", items: [
        "독자적 데이터·설문·벤치마크 (가장 인용이 많음)",
        "한 주제를 끝까지 다룬 결정판 가이드",
        "무료 계산기·체크리스트·템플릿",
        "업계 용어·개념을 정의한 레퍼런스 페이지",
      ] },
      { type: "h2", text: "3단계 — 맥락 있는 매체 발굴" },
      { type: "p", text: "대량 발송이 아니라, 주제가 일치하고 실측 트래픽이 있는 매체를 한 곳씩 찾습니다. 도메인 권위(DR)만 보지 말고, 그 사이트의 글이 실제로 읽히는지, 우리 주제와 맞는지를 함께 봐야 합니다." },
      { type: "h2", text: "피해야 할 것" },
      { type: "ul", items: [
        "PBN(사설 링크 네트워크) 임대",
        "자동 생성·댓글 스팸 링크",
        "주제와 무관한 대량 디렉터리 등록",
        "과도하게 일치하는 앵커 텍스트 반복",
      ] },
      { type: "quote", text: "한 달에 1000개를 발행하더라도, 맥락 없는 링크는 자산이 아니라 부채가 됩니다. 적게, 그러나 맞는 곳에서 받는 편이 훨씬 안전합니다." },
    ],
  },
  {
    slug: "toxic-backlinks-disavow",
    title: "독성 백링크 진단과 디스어바우(Disavow) 실전",
    excerpt:
      "모든 백링크가 자산은 아닙니다. 순위를 갉아먹는 독성 링크를 가려내는 기준과, 구글 디스어바우 도구를 안전하게 쓰는 절차를 단계별로 안내합니다.",
    category: "백링크",
    date: "2026-06-05",
    readingTime: "10분",
  },
  {
    slug: "plastic-surgery-seo-2026",
    title: "성형외과 상위노출 전략: 병원 SEO·백링크로 신환 늘리는 법 [2026]",
    excerpt:
      "성형외과 상위노출이 안 되는 이유부터 키워드 전략, 백링크 빌딩, 네이버·구글 동시 공략까지. 의료광고 규정을 지키면서 신환을 늘리는 성형외과 전용 SEO 가이드.",
    category: "SEO 전략",
    date: "2026-05-31",
    readingTime: "10분",
  },
  {
    slug: "core-web-vitals-2026",
    title: "Core Web Vitals 2026: 실측 데이터로 통과시키는 법",
    excerpt:
      "LCP·INP·CLS 세 지표를 랩 데이터가 아닌 실사용자(CrUX) 기준으로 통과시키는 방법. 흔한 병목과 우선순위 높은 개선 작업을 짚어드립니다.",
    category: "온페이지 SEO",
    date: "2026-05-26",
    readingTime: "12분",
    body: [
      { type: "p", text: "Core Web Vitals는 구글이 페이지 경험을 평가하는 핵심 성능 지표입니다. 순위에 미치는 영향은 콘텐츠만큼 크지 않지만, 경쟁이 비슷할 때 ‘동점 깨기’ 역할을 하고 무엇보다 전환율에 직접 영향을 줍니다." },
      { type: "h2", text: "세 가지 지표" },
      { type: "ul", items: [
        "LCP(Largest Contentful Paint) — 가장 큰 콘텐츠가 뜨는 시간. 2.5초 이내 권장",
        "INP(Interaction to Next Paint) — 사용자 입력 반응성. 200ms 이내 권장",
        "CLS(Cumulative Layout Shift) — 레이아웃이 밀리는 정도. 0.1 이하 권장",
      ] },
      { type: "h2", text: "랩 데이터가 아니라 실사용자 데이터로 본다" },
      { type: "p", text: "Lighthouse 같은 랩 점수는 참고일 뿐, 구글이 실제로 보는 건 CrUX(실사용자 데이터)입니다. 내 기기에서 빨라도 느린 회선의 실사용자에게 느리면 통과하지 못합니다. 서치 콘솔의 ‘페이지 경험’ 리포트로 실측을 확인하세요." },
      { type: "h2", text: "우선순위 높은 개선" },
      { type: "ul", items: [
        "히어로 이미지·폰트 최적화로 LCP 단축",
        "무거운 서드파티 스크립트 지연 로딩으로 INP 개선",
        "이미지·광고 영역에 크기 지정해 CLS 방지",
        "주요 리소스 preload, 사용 안 하는 JS 제거",
      ] },
      { type: "quote", text: "성능 최적화는 한 번의 작업이 아니라 회귀를 막는 운영입니다. 배포할 때마다 실측 지표를 다시 확인하세요." },
    ],
  },
  {
    slug: "ai-overviews-content-survival",
    title: "AI 개요(AI Overviews) 시대, 콘텐츠는 어떻게 살아남나",
    excerpt:
      "검색 결과 상단을 AI 요약이 차지하면서 클릭이 줄고 있습니다. 인용되는 콘텐츠와 묻히는 콘텐츠의 차이, 그리고 대응 전략을 데이터로 살펴봅니다.",
    category: "SEO 트렌드",
    date: "2026-05-20",
    readingTime: "9분",
  },
  {
    slug: "what-is-domain-authority",
    title: "도메인 권위(DR)는 어떻게 만들어지는가",
    excerpt:
      "Ahrefs DR, Moz DA 같은 지표가 실제 검색 순위와 어떻게 연결되는지, 그리고 어떤 작업이 권위 점수를 안전하게 누적시키는지 정리했습니다.",
    category: "SEO 기초",
    date: "2026-05-15",
    readingTime: "8분",
  },
  {
    slug: "competitor-backlink-analysis",
    title: "경쟁사 백링크 분석으로 링크 기회 찾는 법",
    excerpt:
      "경쟁사가 받은 링크는 가장 확실한 링크 지도입니다. 링크 인터섹트로 빈틈을 찾고, 우리도 받을 수 있는 도메인만 추려내는 분석 절차를 공개합니다.",
    category: "백링크",
    date: "2026-05-08",
    readingTime: "11분",
  },
  {
    slug: "b2b-saas-seo-roadmap",
    title: "B2B SaaS를 위한 SEO 로드맵 0→1",
    excerpt:
      "도메인 권위가 0에 가까운 신규 SaaS가 검색 유입을 만드는 12개월 로드맵. 토픽 선점, 비교/대안 키워드, 제품 주도 콘텐츠까지 단계별로 설계합니다.",
    category: "SEO 전략",
    date: "2026-04-30",
    readingTime: "14분",
  },
  {
    slug: "guidelines-vs-blackhat-2026",
    title: "2026년에도 통하는 백링크 전략, 위험한 백링크 전략",
    excerpt:
      "구글의 최근 코어 업데이트와 스팸 정책 변화를 정리하고, 어떤 기법이 여전히 유효하고 어떤 것은 페널티 위험에 노출되는지 비교합니다.",
    category: "백링크",
    date: "2026-04-28",
    readingTime: "12분",
  },
  {
    slug: "guest-posting-2026",
    title: "게스트 포스팅, 2026년에도 효과 있을까?",
    excerpt:
      "여전히 유효하지만 방식이 달라졌습니다. 링크만 노린 대량 발행은 위험하고, 실측 트래픽 있는 매체의 맥락 있는 기고는 여전히 강력합니다. 그 경계를 짚습니다.",
    category: "링크빌딩",
    date: "2026-04-18",
    readingTime: "10분",
  },
  {
    slug: "core-update-2026-trend",
    title: "2026 구글 코어 업데이트 이후 달라진 검색 트렌드",
    excerpt:
      "AI 개요(AI Overviews) 확대와 헬프풀 콘텐츠 시스템 통합 이후, 실제 트래픽이 어떻게 재분배되고 있는지 데이터로 살펴봅니다.",
    category: "SEO 트렌드",
    date: "2026-04-10",
    readingTime: "9분",
  },
  {
    slug: "schema-rich-results",
    title: "구조화 데이터(Schema)로 리치 결과 노리기",
    excerpt:
      "FAQ·리뷰·제품·이벤트. 알맞은 스키마 한 줄이 검색 결과에서 자리를 키웁니다. 리치 결과 대상 마크업과 흔히 틀리는 검증 오류를 정리했습니다.",
    category: "온페이지 SEO",
    date: "2026-04-02",
    readingTime: "10분",
  },
  {
    slug: "local-seo-gbp",
    title: "지역 비즈니스 로컬 SEO와 구글 비즈니스 프로필 최적화",
    excerpt:
      "'지역명+업종' 검색에서 지도 3팩에 드는 법. 구글 비즈니스 프로필 최적화, NAP 일관성, 리뷰 신호까지 로컬 순위 요인을 실전 위주로 다룹니다.",
    category: "SEO 전략",
    date: "2026-03-28",
    readingTime: "11분",
  },
  {
    slug: "topic-cluster-design",
    title: "토픽 클러스터를 처음 설계할 때 자주 하는 실수 5가지",
    excerpt:
      "허브-스포크 구조의 핵심은 키워드가 아니라 검색 의도입니다. 의도 단위로 클러스터를 짤 때 빠지기 쉬운 함정을 사례와 함께 설명합니다.",
    category: "온페이지 SEO",
    date: "2026-03-22",
    readingTime: "10분",
  },
  {
    slug: "index-coverage-checklist",
    title: "구글 색인 안 되는 페이지, 원인 7가지 체크리스트",
    excerpt:
      "발행은 했는데 검색에 안 잡힌다면 색인 단계에서 막힌 것입니다. robots, 캐노니컬, 크롤 예산, 중복 콘텐츠까지 원인 7가지를 순서대로 점검합니다.",
    category: "SEO 기초",
    date: "2026-03-12",
    readingTime: "9분",
  },
  {
    slug: "seo-tool-stack-2026",
    title: "2026년 SEO 실무자가 실제로 쓰는 도구 스택",
    excerpt:
      "키워드 리서치, 백링크 분석, 순위 추적, 로그 분석까지. 비싼 올인원 대신 목적별로 조합하는 효율적인 SEO 도구 구성을 정리했습니다.",
    category: "SEO 도구",
    date: "2026-03-05",
    readingTime: "11분",
  },
];

export function Blog() {
  useRevealOnScroll();

  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "전체" || post.category === activeCategory;
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      {/* Hero + filters */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-12 md:pb-16">
          <h1 className="reveal h-display text-[44px] sm:text-[64px] md:text-[88px] ko">
            블로그
          </h1>
          <p className="reveal mt-8 text-[16px] md:text-[18px] leading-[1.65] text-[#8e8e8e] max-w-[58ch] ko">
            구글 상위노출, 백링크, PBN, 온페이지 SEO, 네이버 SEO 등 검색엔진
            최적화에 대한 전문 가이드와 최신 트렌드를 공유합니다.
          </p>

          {/* Category filter */}
          <div className="reveal mt-12 flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={
                    "px-4 py-2 text-[13px] font-medium tracking-[-0.01em] border rounded-[4px] transition-colors ko " +
                    (active
                      ? "border-[#00c800] text-[#00c800] bg-[#00c800]/[0.06]"
                      : "border-[#262626] text-[#8e8e8e] hover:border-[#3a3a3a] hover:text-[#e0e0e0]")
                  }
                  aria-pressed={active}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="reveal mt-5 relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#5a5a5a]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="블로그 검색..."
              aria-label="블로그 검색"
              className="w-full bg-[#141414] border border-[#262626] rounded-[6px] pl-12 pr-4 py-3.5 text-[15px] text-[#f0f0f0] placeholder:text-[#5a5a5a] focus:outline-none focus:border-[#3a3a3a] transition-colors ko"
            />
          </div>
        </div>
      </section>

      {/* Posts list */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div>
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="reveal group grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-8 items-center py-8 md:py-9 border-b border-[#262626] first:border-t hover:bg-[#141414] transition-colors -mx-5 md:-mx-8 px-5 md:px-8"
    >
      <Thumbnail category={post.category} />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#5a5a5a] font-mono">
              {formatDate(post.date)}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-medium border border-[#00c800] text-[#00c800] rounded-[4px] ko">
              {post.category}
            </span>
          </div>
          <h2 className="mt-3 text-[20px] md:text-[24px] font-semibold tracking-[-0.025em] leading-[1.3] text-[#f0f0f0] group-hover:text-white transition-colors ko">
            {post.title}
          </h2>
          <p className="mt-2.5 text-[14px] md:text-[15px] text-[#8e8e8e] leading-[1.65] line-clamp-2 ko">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-[#5a5a5a]">
          <span className="text-[12px] font-mono">{post.readingTime} 읽기</span>
          <ArrowRight className="w-5 h-5 group-hover:text-[#f0f0f0] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

/**
 * 카테고리별 인라인 SVG 썸네일.
 * 외부 이미지 에셋 없이 다크 배경 + 그린 액센트로 통일.
 * 카테고리마다 다른 모티프를 매핑해 글마다 이미지가 구분되도록 함.
 */
type Motif = "graph" | "chart" | "pages" | "layout" | "gauge";

function motifFor(category: string): Motif {
  switch (category) {
    case "링크빌딩":
    case "백링크":
      return "graph";
    case "SEO 전략":
    case "SEO 트렌드":
      return "chart";
    case "SEO 기초":
      return "pages";
    case "온페이지 SEO":
      return "layout";
    case "SEO 도구":
      return "gauge";
    default:
      return "graph";
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function Thumbnail({ category, large = false }: { category: string; large?: boolean }) {
  const motif = motifFor(category);

  return (
    <div
      className={
        "relative w-full overflow-hidden rounded-[6px] border border-[#262626] bg-[#0f0f0f] " +
        (large ? "aspect-[16/7]" : "aspect-[16/10] sm:aspect-auto sm:h-[110px]")
      }
    >
      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {motif === "chart" && (
          // 대시보드 / 막대 차트 전략·트렌드
          <>
            <rect x="24" y="120" width="22" height="50" rx="2" fill="#1f1f1f" />
            <rect x="58" y="96" width="22" height="74" rx="2" fill="#1f1f1f" />
            <rect x="92" y="70" width="22" height="100" rx="2" fill="#262626" />
            <rect x="126" y="48" width="22" height="122" rx="2" fill="#00c800" opacity="0.85" />
            <polyline
              points="180,150 210,120 235,132 268,80 296,60"
              fill="none"
              stroke="#00c800"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [180, 150],
              [210, 120],
              [235, 132],
              [268, 80],
              [296, 60],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#00c800" />
            ))}
          </>
        )}

        {motif === "graph" && (
          // 노드 그래프 / 백링크 네트워크 링크빌딩·백링크
          <>
            {[
              [60, 60],
              [60, 140],
              [260, 60],
              [260, 140],
            ].map(([x, y]) => (
              <line key={`l-${x}-${y}`} x1="160" y1="100" x2={x} y2={y} stroke="#262626" strokeWidth="1.5" />
            ))}
            {[
              [60, 60],
              [60, 140],
              [260, 60],
              [260, 140],
            ].map(([cx, cy]) => (
              <circle key={`n-${cx}-${cy}`} cx={cx} cy={cy} r="9" fill="#1f1f1f" stroke="#3a3a3a" strokeWidth="1" />
            ))}
            <circle cx="160" cy="100" r="16" fill="#00c800" opacity="0.9" />
            <circle cx="160" cy="100" r="26" fill="none" stroke="#00c800" strokeWidth="1" opacity="0.3" />
          </>
        )}

        {motif === "pages" && (
          // 쌓인 문서 SEO 기초
          <>
            <rect x="96" y="44" width="128" height="120" rx="6" fill="#161616" stroke="#262626" strokeWidth="1.5" />
            <rect x="84" y="56" width="128" height="120" rx="6" fill="#1b1b1b" stroke="#3a3a3a" strokeWidth="1.5" />
            <rect x="72" y="68" width="128" height="120" rx="6" fill="#0f0f0f" stroke="#00c800" strokeWidth="1.5" />
            {[92, 108, 124, 140].map((y, i) => (
              <rect
                key={y}
                x="88"
                y={y}
                width={i === 0 ? 96 : i === 3 ? 60 : 84}
                height="7"
                rx="3.5"
                fill={i === 0 ? "#00c800" : "#2a2a2a"}
                opacity={i === 0 ? 0.85 : 1}
              />
            ))}
          </>
        )}

        {motif === "layout" && (
          // 웹페이지 와이어프레임 온페이지 SEO
          <>
            <rect x="48" y="36" width="224" height="128" rx="8" fill="#0f0f0f" stroke="#262626" strokeWidth="1.5" />
            <rect x="48" y="36" width="224" height="26" rx="8" fill="#1a1a1a" />
            <circle cx="64" cy="49" r="3" fill="#00c800" />
            <rect x="80" y="46" width="60" height="6" rx="3" fill="#2a2a2a" />
            <rect x="64" y="78" width="128" height="10" rx="3" fill="#00c800" opacity="0.85" />
            <rect x="64" y="98" width="150" height="6" rx="3" fill="#2a2a2a" />
            <rect x="64" y="112" width="120" height="6" rx="3" fill="#2a2a2a" />
            <rect x="64" y="132" width="84" height="16" rx="4" fill="#1f1f1f" stroke="#3a3a3a" strokeWidth="1" />
            <rect x="212" y="78" width="44" height="70" rx="4" fill="#161616" stroke="#262626" strokeWidth="1" />
          </>
        )}

        {motif === "gauge" && (
          // 속도/성능 게이지 SEO 도구
          <>
            <path d="M70 150 A90 90 0 0 1 250 150" fill="none" stroke="#262626" strokeWidth="14" strokeLinecap="round" />
            <path d="M70 150 A90 90 0 0 1 196 70" fill="none" stroke="#00c800" strokeWidth="14" strokeLinecap="round" opacity="0.9" />
            <line x1="160" y1="150" x2="206" y2="96" stroke="#f0f0f0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="160" cy="150" r="7" fill="#0f0f0f" stroke="#f0f0f0" strokeWidth="2.5" />
          </>
        )}
      </svg>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 md:py-28">
      <div className="eyebrow mb-6">검색 결과가 없습니다</div>
      <p className="text-[15px] md:text-[16px] text-[#8e8e8e] max-w-[40ch] mx-auto leading-relaxed ko">
        다른 키워드나 카테고리로 다시 시도해 보세요.
        찾으시는 주제가 있다면 직접 문의 주셔도 됩니다.
      </p>
    </div>
  );
}

export function formatDate(iso: string): string {
  // 2026-06-11 → 2026년 6월 11일
  const [y, m, d] = iso.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}
