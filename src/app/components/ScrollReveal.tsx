import { useEffect, useRef } from "react";

/**
 * ScrollReveal — 스크롤 위치에 동기화된 단어별 페이드 인 섹션
 *
 * 핵심:
 * - 섹션 = 200vh 높이 (스크롤할 거리 확보)
 * - sticky 컨테이너 = 100vh (뷰포트 가득) + overflow:hidden (자식이 절대 밖으로 못 나감)
 * - 단어 span은 inline (inline-block 아님) → 한국어 띄어쓰기 기준 자연 줄바꿈
 */

const PARAGRAPHS = [
  "검색 권위는 하루아침에 생기지 않습니다. 도메인의 신뢰는 시간과 일관성 위에 누적되고, 한 번 무너지면 회복에 그보다 더 긴 시간이 필요합니다.",
  "우리는 단기 순위가 아니라 다음 코어 업데이트 후에도 살아남는 구조를 만듭니다. 천천히, 그러나 무너지지 않게.",
];

const ACCENT_WORDS = new Set(["권위는", "신뢰는", "구조를"]);

export function ScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      wordsRef.current.forEach((w) => {
        if (w) w.style.opacity = "1";
      });
      return;
    }

    let rafID = 0;
    let ticking = false;

    function update() {
      const sec = sectionRef.current;
      if (!sec) return;

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollableDistance = sec.offsetHeight - vh;
      const scrolled = Math.max(0, -rect.top);
      const progress = scrollableDistance > 0
        ? Math.min(1, scrolled / scrollableDistance)
        : 0;

      const words = wordsRef.current;
      const total = words.length;
      if (total === 0) return;

      // 진행률 살짝 부스트 — 100% 도달 전 모든 단어가 또렷해지도록
      const adjustedProgress = Math.min(1, progress * 1.15);

      for (let i = 0; i < total; i++) {
        const w = words[i];
        if (!w) continue;

        const wordStart = i / total;
        const fadeDistance = 0.15;
        const wordEnd = wordStart + fadeDistance;

        let opacity: number;
        if (adjustedProgress <= wordStart) {
          opacity = 0.18;
        } else if (adjustedProgress >= wordEnd) {
          opacity = 1;
        } else {
          const localProgress = (adjustedProgress - wordStart) / fadeDistance;
          opacity = 0.18 + localProgress * 0.82;
        }
        w.style.opacity = opacity.toFixed(3);
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        rafID = requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafID) cancelAnimationFrame(rafID);
    };
  }, []);

  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: "200vh" }}
    >
      {/*
        sticky 컨테이너:
        - h-screen으로 정확히 뷰포트 높이만큼만 차지
        - overflow-hidden으로 자식이 절대 밖으로 못 나가게 (가장 중요)
        - flex로 콘텐츠 세로 중앙 정렬
      */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-start">
            <div className="md:col-span-3">
              <div className="eyebrow">/ 시간이 만드는 것</div>
            </div>
            {/*
              본문 영역:
              - max-w를 넓혀서 한 줄에 여러 단어 들어가도록 (이전엔 너무 좁아서 글자별 줄바꿈)
              - 글자 크기 합리화: 모바일 22px → 데스크톱 40px (이전 64px은 과함)
            */}
            <div className="md:col-span-9 max-w-[60ch]">
              {PARAGRAPHS.map((para, pIdx) => {
                const tokens = para.split(/(\s+)/);
                return (
                  <p
                    key={pIdx}
                    className={
                      "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] " +
                      "leading-[1.45] tracking-[-0.02em] font-semibold ko " +
                      (pIdx > 0 ? "mt-6 md:mt-8" : "")
                    }
                  >
                    {tokens.map((token, tIdx) => {
                      // 공백은 페이드 없이 그대로
                      if (/^\s+$/.test(token)) {
                        return <span key={tIdx}>{token}</span>;
                      }
                      const idx = wordIndex++;
                      const isAccent = ACCENT_WORDS.has(token);
                      return (
                        <span
                          key={tIdx}
                          ref={(el) => {
                            if (el) wordsRef.current[idx] = el;
                          }}
                          style={{
                            opacity: 0.18,
                            transition: "opacity 0.05s linear",
                            color: isAccent ? "#00ff00" : "#f0f0f0",
                            // inline (inline-block 아님) — 줄바꿈이 띄어쓰기 기준 자연스러움
                            willChange: "opacity",
                          }}
                        >
                          {token}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
