import { useEffect, useRef } from "react";

/**
 * ScrollReveal — 스크롤 위치에 동기화된 단어별 페이드 인 섹션
 *
 * 동작:
 * - 섹션이 뷰포트에 진입하면 sticky로 고정
 * - 사용자가 스크롤할수록 텍스트의 각 단어가 흐림(0.2)에서 또렷(1.0)으로 페이드
 * - 섹션 전체가 통과하면 sticky 풀리며 다음 섹션으로
 *
 * 구현:
 * - scroll 이벤트 + requestAnimationFrame (호환성 최대, 성능 보장)
 * - GPU 가속 opacity만 변경 (transform 없이도 60fps 유지)
 * - prefers-reduced-motion 존중 (즉시 또렷한 상태로 표시)
 */

// 단어 단위 분할 — 한국어는 공백 기준이 자연스러움
const PARAGRAPHS = [
  "검색 권위는 하루아침에 생기지 않습니다. 도메인의 신뢰는 시간과 일관성 위에 누적되고, 한 번 무너지면 회복에 그보다 더 긴 시간이 필요합니다.",
  "우리는 단기 순위가 아니라 다음 코어 업데이트 후에도 살아남는 구조를 만듭니다. 천천히, 그러나 무너지지 않게.",
];

// 액센트 단어 — #00ff00으로 강조될 키워드 (정확히 일치하는 단어만)
const ACCENT_WORDS = new Set(["권위는", "신뢰는", "구조를"]);

export function ScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 접근성: 모션 줄이기 선호 시 모든 단어 즉시 또렷하게
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

      // 진행률 계산:
      //   섹션 상단이 뷰포트 상단에 닿는 순간 → 0
      //   섹션 하단이 뷰포트 하단에서 한 뷰포트 위로 갈 때 → 1
      //   sticky 영역의 스크롤 가능 거리 = (섹션 높이) - (뷰포트 높이)
      const scrollableDistance = sec.offsetHeight - vh;
      const scrolled = Math.max(0, -rect.top);
      const progress = scrollableDistance > 0
        ? Math.min(1, scrolled / scrollableDistance)
        : 0;

      // 단어별 opacity 계산
      const words = wordsRef.current;
      const total = words.length;
      if (total === 0) return;

      // 살짝의 여유를 두고 — 진행률이 1에 닿기 전에 모든 단어가 또렷해지도록
      const adjustedProgress = Math.min(1, progress * 1.1);

      for (let i = 0; i < total; i++) {
        const w = words[i];
        if (!w) continue;

        // 각 단어의 등장 시점 (0 ~ 1 사이로 균등 분포)
        const wordStart = i / total;
        // 단어가 또렷해지는 데 걸리는 거리 (전체의 약 12%)
        const fadeDistance = 0.12;
        const wordEnd = wordStart + fadeDistance;

        let opacity: number;
        if (adjustedProgress <= wordStart) {
          opacity = 0.18; // 시작 전: 매우 흐림
        } else if (adjustedProgress >= wordEnd) {
          opacity = 1; // 통과: 완전히 또렷
        } else {
          // 그 사이: 부드럽게 보간
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

    // 초기 한 번 실행 (페이지 진입 시 위치에 따라)
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafID) cancelAnimationFrame(rafID);
    };
  }, []);

  // 전체 단어 인덱스 카운터 (paragraph 간에 연속 인덱스 유지)
  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
      // sticky 작동을 위해 충분한 높이 (뷰포트 2배) — 그 안에서 sticky 영역이 머무름
      style={{ height: "200vh" }}
    >
      {/* sticky 컨테이너 — 섹션이 뷰포트 안에 있는 동안 화면에 고정됨 */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-3">
              <div className="eyebrow">/ 시간이 만드는 것</div>
            </div>
            <div className="md:col-span-9 max-w-[28ch] md:max-w-[22ch]">
              {PARAGRAPHS.map((para, pIdx) => {
                const words = para.split(/(\s+)/); // 공백도 보존하면서 분할
                return (
                  <p
                    key={pIdx}
                    className={
                      pIdx === 0
                        ? "text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] leading-[1.15] tracking-[-0.025em] font-semibold ko"
                        : "mt-10 md:mt-14 text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] leading-[1.15] tracking-[-0.025em] font-semibold ko"
                    }
                  >
                    {words.map((token, tIdx) => {
                      // 공백 토큰은 그대로 출력 (페이드 없이)
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
                            display: "inline-block",
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
