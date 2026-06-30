import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";
import { applySEO } from "../lib/seo";
import { getPostBySlug, Thumbnail, formatDate, type ContentBlock } from "./Blog";

export function BlogPost() {
  useRevealOnScroll();
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      applySEO(`${post.title} | 링크프레소`, post.excerpt, `/blog/${post.slug}`);
    }
  }, [post]);

  if (!post) {
    return (
      <section className="py-24 md:py-40">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 text-center">
          <div className="eyebrow mb-6">글을 찾을 수 없습니다</div>
          <p className="text-[15px] md:text-[16px] text-[#8e8e8e] leading-relaxed mb-8 ko">
            주소가 바뀌었거나 삭제된 글일 수 있습니다.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#f0f0f0] border-b border-[#f0f0f0] pb-1 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            블로그로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        {/* Back */}
        <Link
          to="/blog"
          className="reveal inline-flex items-center gap-2 text-[13px] font-medium text-[#8e8e8e] hover:text-[#f0f0f0] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          블로그
        </Link>

        {/* Header */}
        <div className="reveal flex items-center gap-3 mb-5">
          <span className="text-[12px] text-[#5a5a5a] font-mono">{formatDate(post.date)}</span>
          <span className="px-2.5 py-1 text-[11px] font-medium border border-[#00c800] text-[#00c800] rounded-[4px] ko">
            {post.category}
          </span>
          <span className="text-[12px] text-[#5a5a5a] font-mono">{post.readingTime} 읽기</span>
        </div>
        <h1 className="reveal h-display text-[30px] sm:text-[40px] md:text-[48px] leading-[1.18] tracking-[-0.03em] ko">
          {post.title}
        </h1>
        <p className="reveal mt-6 text-[16px] md:text-[18px] leading-[1.7] text-[#c8c8c8] ko">
          {post.excerpt}
        </p>

        {/* Hero image */}
        <div className="reveal mt-10">
          <Thumbnail category={post.category} large />
        </div>

        {/* Body */}
        {post.body && post.body.length > 0 ? (
          <div className="reveal mt-12 space-y-7">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        ) : (
          <div className="reveal mt-12 border border-[#262626] bg-[#141414] rounded-xl p-8 text-center">
            <div className="eyebrow mb-3">본문 준비 중</div>
            <p className="text-[14.5px] text-[#8e8e8e] leading-relaxed ko">
              이 글은 곧 전체 내용으로 채워집니다. 먼저 궁금한 점이 있다면 편하게 문의 주세요.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="reveal mt-16 pt-10 border-t border-[#262626] text-center">
          <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.02em] ko">
            검색에서 발견되는 웹사이트, 같이 만들까요
          </h2>
          <p className="mt-4 text-[14.5px] md:text-[15px] text-[#8e8e8e] max-w-[44ch] mx-auto leading-relaxed ko">
            도메인 URL만 알려주시면 무료 진단 리포트를 보내드립니다.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 h-[52px] px-7 bg-[#f0f0f0] text-[#0a0a0a] rounded-full text-[14.5px] font-medium hover:bg-[#e0e0e0] transition-all"
          >
            무료 진단 신청
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] text-[#f0f0f0] pt-3 ko">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="text-[15.5px] md:text-[16.5px] leading-[1.8] text-[#c8c8c8] ko">{block.text}</p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] md:text-[16px] text-[#c8c8c8] leading-[1.7] ko">
              <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#00c800] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-[#00c800] pl-5 py-1 text-[16px] md:text-[18px] leading-[1.7] text-[#f0f0f0] font-medium ko">
          {block.text}
        </blockquote>
      );
    default:
      return null;
  }
}
