import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useSEO } from "../lib/seo";

/* ───────────────────────────────────────────────────
   브랜드 마크 빨간 점 1개는 여기에만 존재
─────────────────────────────────────────────────── */
function BrandMark({ size = "base" }: { size?: "base" | "sm" }) {
  return (
    <Link to="/" className="inline-flex items-baseline gap-0 group" aria-label="LinkPresso home">
      <span
        className={cn(
          "tracking-[-0.035em] font-semibold text-[#f0f0f0]",
          size === "sm" ? "text-[15px]" : "text-[18px] md:text-[19px]"
        )}
      >
        LinkPresso
      </span>
      <span
        aria-hidden
        className={cn(
          "ml-[2px] rounded-full bg-[#00c800] inline-block translate-y-[-1px] transition-transform group-hover:scale-125",
          size === "sm" ? "w-[5px] h-[5px]" : "w-[6px] h-[6px]"
        )}
      />
    </Link>
  );
}

/* ───────────────────────────────────────────────────
   Nav links
─────────────────────────────────────────────────── */
const NAV = [
  { to: "/services", label: "서비스" },
  { to: "/cases", label: "케이스 스터디" },
  { to: "/blog", label: "블로그" },
  { to: "/pricing", label: "요금제" },
  { to: "/about", label: "회사 소개" },
  { to: "/contact", label: "문의" },
];

/* ───────────────────────────────────────────────────
   Root layout
─────────────────────────────────────────────────── */
export function Root() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 라우트별 title / description / canonical / og 메타 갱신
  useSEO();

  // 라우트 변경 시 모바일 메뉴 닫기 + 스크롤 최상단
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 모바일 메뉴 열렸을 때 body 스크롤 잠금
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f0f0f0]">
      {/* ─── Navigation ─── */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-[#262626]">
        <nav className="max-w-[1280px] mx-auto px-5 md:px-8 h-[68px] md:h-[76px] flex items-center justify-between">
          <BrandMark />

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "text-[14px] font-medium transition-colors relative py-1",
                      isActive ? "text-[#f0f0f0]" : "text-[#8e8e8e] hover:text-[#f0f0f0]"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-[#f0f0f0]" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 h-9 px-4 text-[13px] font-medium bg-[#f0f0f0] text-[#0a0a0a] rounded-md hover:bg-[#e0e0e0] transition-colors"
            >
              무료 진단
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="md:hidden -mr-2 p-2 text-[#f0f0f0]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#262626] bg-[#1a1a1a]">
            <div className="max-w-[1280px] mx-auto px-5 py-6 space-y-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors",
                      isActive
                        ? "bg-[#141414] text-[#f0f0f0]"
                        : "text-[#c8c8c8] hover:bg-[#141414]"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-md bg-[#f0f0f0] text-[#0a0a0a] text-[14px] font-medium"
              >
                무료 진단
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ─── Page content ─── */}
      <main id="main" className="flex-1">
        <Outlet />
      </main>

      {/* ─── Footer ─── */}
      <Footer />

      {/* ─── 플로팅 카카오톡 문의 버튼 (모든 페이지 우측 하단 고정) ─── */}
      <a
        href="https://open.kakao.com/o/sF4jwPBi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 문의하기"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-full bg-[#FEE500] pl-5 pr-6 py-4 text-[#191600] text-[16px] md:text-[17px] font-semibold shadow-xl shadow-black/30 hover:brightness-95 active:scale-95 transition"
      >
        <KakaoIcon className="w-7 h-7" />
        <span className="hidden sm:inline">카톡 문의</span>
      </a>
    </div>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M128 36C70.56 36 24 72.74 24 118.06c0 29.32 19.5 55.05 48.82 69.51-1.61 5.86-8.3 30.23-8.57 32.15 0 0-.17 1.43.76 1.98.93.55 2.02.13 2.02.13 2.69-.38 31.17-20.4 36.1-23.88 7.45 1.05 15.13 1.6 22.85 1.6 57.44 0 104-36.74 104-82.06S185.44 36 128 36z" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────
   Footer
─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-20">
        {/* Legal info */}
        <div>
          <BrandMark size="sm" />
          <div className="mt-5 text-[12px] text-[#5a5a5a] space-y-1.5 leading-relaxed">
            <p>대표자: 이영민 &nbsp;|&nbsp; 사업자 등록번호: 458-87-03871</p>
            <p>소재지: 인하대학교 인하드림센터 1관 608호</p>
            <p>
              이메일:{" "}
              <a
                href="mailto:likkoreaofficial@gmail.com"
                className="hover:text-[#c8c8c8] underline underline-offset-2"
              >
                likkoreaofficial@gmail.com
              </a>
            </p>
            <p>개인정보관리책임자: 임상준 &nbsp;|&nbsp; 호스팅제공자: Vercel</p>
          </div>
          <div className="mt-6 pt-6 rule flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-[12px] text-[#5a5a5a] hover:text-[#c8c8c8] underline underline-offset-2">이용약관</Link>
              <span className="text-[#3a3a3a] text-[12px]">/</span>
              <Link to="/privacy" className="text-[12px] text-[#5a5a5a] hover:text-[#c8c8c8] underline underline-offset-2">개인정보처리방침</Link>
            </div>
            <span className="sm:ml-auto text-[12px] text-[#5a5a5a]">© 2026 LIK. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
