import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * 페이지별 온페이지 SEO
 *
 * SPA(react-router)는 라우트가 바뀌어도 index.html의 <title>/메타가 그대로라
 * 모든 페이지가 같은 제목·설명을 공유하게 됩니다. 이 훅이 라우트 변경마다
 * document.title 과 description / canonical / og 메타를 페이지에 맞게 갱신합니다.
 *
 * 새 페이지를 추가하면 SEO_MAP에 항목을 넣어주세요.
 */

export const SITE_URL = "https://linkpresso.kr";

const DEFAULT_TITLE = "웹사이트 제작·개발 전문 링크프레소 | 검색까지 고려한 웹빌드";
const DEFAULT_DESC =
  "단순히 보기 좋은 웹사이트를 넘어, 검색에 강한 웹사이트를 제작합니다. 링크프레소는 SEO 구조를 처음부터 설계에 반영하는 웹빌드 솔루션을 제공합니다.";

interface SEOEntry {
  title: string;
  description: string;
}

const SEO_MAP: Record<string, SEOEntry> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  "/services": {
    title: "서비스 | 링크프레소 웹사이트 제작·온페이지 SEO·백엔드 개발",
    description:
      "웹사이트 제작, 온페이지 SEO 세팅, 백엔드 웹개발, 키워드 클러스터, 도메인 구매 대행. 검색 권위를 만드는 다섯 가지 축을 링크프레소가 한 흐름으로 다룹니다.",
  },
  "/pricing": {
    title: "요금제 | 링크프레소 정직한 가격, 맞는 것부터",
    description:
      "도메인 규모와 목표에 따라 시작점이 달라집니다. 진단 후 어느 플랜이 맞는지 솔직히 말씀드립니다. 무리한 패키지는 권하지 않습니다.",
  },
  "/cases": {
    title: "케이스 스터디 | 링크프레소 결과는 기록으로 남습니다",
    description:
      "어떤 작업을 왜 했고 어떤 지표로 검증했는지, 링크프레소의 작업이 어떻게 구성되는지 보여드립니다.",
  },
  "/blog": {
    title: "블로그 | 링크프레소 SEO와 웹빌드 인사이트",
    description:
      "검색 권위, 백링크, 온페이지 SEO, 웹사이트 제작에 대한 링크프레소의 실무 기록과 인사이트를 공유합니다.",
  },
  "/contact": {
    title: "문의 | 링크프레소 무료 도메인 진단 신청",
    description:
      "도메인 URL과 연락처만 알려주시면 무료 진단 리포트를 보내드립니다. 응답은 1시간 이내.",
  },
  "/terms": {
    title: "이용약관 | 링크프레소",
    description: "링크프레소 서비스 이용약관입니다.",
  },
  "/privacy": {
    title: "개인정보처리방침 | 링크프레소",
    description: "링크프레소가 개인정보를 수집·이용·보관하는 방식에 대한 안내입니다.",
  },
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * 임의 경로의 메타를 적용 (블로그 상세처럼 동적 경로용).
 * 페이지 컴포넌트에서 직접 호출.
 */
export function applySEO(title: string, description: string, path: string) {
  const url = SITE_URL + (path === "/" ? "" : path);
  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertCanonical(url);
}

export function useSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 블로그 상세(/blog/:slug)는 해당 페이지 컴포넌트가 직접 메타를 세팅하므로 건너뜀
    if (pathname.startsWith("/blog/")) return;

    const entry = SEO_MAP[pathname] ?? { title: DEFAULT_TITLE, description: DEFAULT_DESC };
    applySEO(entry.title, entry.description, pathname);
  }, [pathname]);
}
