import { Link } from "react-router";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

export function NotFound() {
  useRevealOnScroll();

  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <div className="reveal text-[120px] md:text-[200px] leading-[0.85] font-semibold tracking-[-0.05em] tabular-nums">
              404
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="reveal eyebrow mb-6">페이지를 찾을 수 없습니다</div>
            <h1 className="reveal h-section text-[28px] md:text-[44px] max-w-[20ch] mb-6 ko">
              이 주소에는 아무것도<br />
              없는 것 같습니다
            </h1>
            <p className="reveal text-[15px] md:text-[16px] leading-[1.7] text-[#8e8e8e] max-w-[48ch] mb-10 ko">
              링크가 잘못됐거나, 페이지가 이동·삭제됐을 가능성이 있습니다.
              아래에서 가시려는 곳을 골라주세요.
            </p>
            <div className="reveal flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center h-[48px] px-6 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[14px] font-medium hover:bg-[#e0e0e0] transition-colors"
              >
                홈으로
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center h-[48px] px-6 border border-[#f0f0f0] text-[#f0f0f0] rounded-full text-[14px] font-medium hover:bg-[#141414] transition-colors"
              >
                서비스 보기
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center h-[48px] px-6 border border-[#f0f0f0] text-[#f0f0f0] rounded-full text-[14px] font-medium hover:bg-[#141414] transition-colors"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
