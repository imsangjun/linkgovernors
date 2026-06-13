import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

/* ───────────────────────────────────────────────────
   브랜드 마크 — 빨간 점 1개는 여기에만 존재
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
          "ml-[2px] rounded-full bg-[#00ff00] inline-block translate-y-[-1px] transition-transform group-hover:scale-125",
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
  { to: "/about", label: "회사" },
  { to: "/contact", label: "문의" },
];

/* ───────────────────────────────────────────────────
   Root layout
─────────────────────────────────────────────────── */
export function Root() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
              className="inline-flex items-center h-9 px-4 text-[13px] font-medium bg-[#f0f0f0] text-[#0a0a0a] rounded-full hover:bg-[#e0e0e0] transition-colors"
            >
              무료 도메인 진단
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
                className="mt-4 block w-full text-center px-4 py-3.5 rounded-full bg-[#f0f0f0] text-[#0a0a0a] text-[14px] font-medium"
              >
                무료 도메인 진단
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
    </div>
  );
}

/* ───────────────────────────────────────────────────
   Footer
─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-20">
        {/* Big footer headline */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 mb-16">
          <div>
            <h3 className="text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.035em] font-semibold ko">
              검색 결과 1페이지는<br />
              운이 아닙니다.
            </h3>
            <p className="mt-5 text-[14px] md:text-[15px] text-[#8e8e8e] leading-relaxed max-w-[42ch] ko">
              지금 도메인을 보내주시면, 어떤 작업이 필요한지 한 페이지로 정리해 드립니다.
              제안서가 마음에 들지 않으면 그걸로 끝입니다.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-[#f0f0f0] border-b border-[#f0f0f0] pb-1 hover:gap-3 transition-all"
            >
              진단 요청하기
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="eyebrow mb-4">서비스</h4>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><Link to="/services" className="text-[#c8c8c8] hover:text-[#f0f0f0]">백링크 빌딩</Link></li>
                <li><Link to="/services" className="text-[#c8c8c8] hover:text-[#f0f0f0]">온페이지 SEO</Link></li>
                <li><Link to="/services" className="text-[#c8c8c8] hover:text-[#f0f0f0]">콘텐츠 설계</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="eyebrow mb-4">회사</h4>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><Link to="/about" className="text-[#c8c8c8] hover:text-[#f0f0f0]">소개</Link></li>
                <li><Link to="/contact" className="text-[#c8c8c8] hover:text-[#f0f0f0]">문의</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal info */}
        <div className="rule pt-8">
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
            <p>
              인스타그램:{" "}
              <a
                href="https://www.instagram.com/linkgovernours/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c8c8c8] underline underline-offset-2"
              >
                openviral_space
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
