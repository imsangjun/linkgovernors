import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "../lib/useRevealOnScroll";

/**
 * Blog 페이지 - 글 리스트
 *
 * 향후 글 추가 방법:
 * 1. 아래 POSTS 배열에 새 객체 추가
 * 2. 또는 별도 데이터 파일(blog-posts.ts)로 분리한 뒤 import
 * 3. 본격 운영 시 MDX, Contentlayer, 또는 헤드리스 CMS(Notion API, Sanity 등) 도입 고려
 */

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  readingTime: string;
}

const POSTS: BlogPost[] = [
  {
    slug: "what-is-domain-authority",
    title: "도메인 권위(DR)는 어떻게 만들어지는가",
    excerpt:
      "Ahrefs DR, Moz DA 같은 지표가 실제 검색 순위와 어떻게 연결되는지, 그리고 어떤 작업이 권위 점수를 안전하게 누적시키는지 정리했습니다.",
    category: "기초",
    date: "2026-01-15",
    readingTime: "8분",
  },
  {
    slug: "guidelines-vs-blackhat-2026",
    title: "2026년에도 통하는 백링크 전략, 위험한 백링크 전략",
    excerpt:
      "구글의 최근 코어 업데이트와 스팸 정책 변화를 정리하고, 어떤 기법이 여전히 유효하고 어떤 것은 페널티 위험에 노출되는지 비교합니다.",
    category: "전략",
    date: "2026-01-08",
    readingTime: "12분",
  },
  {
    slug: "topic-cluster-design",
    title: "토픽 클러스터를 처음 설계할 때 자주 하는 실수 5가지",
    excerpt:
      "허브-스포크 구조의 핵심은 키워드가 아니라 검색 의도입니다. 의도 단위로 클러스터를 짤 때 빠지기 쉬운 함정을 사례와 함께 설명합니다.",
    category: "온페이지",
    date: "2025-12-22",
    readingTime: "10분",
  },
];

export function Blog() {
  useRevealOnScroll();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="reveal eyebrow mb-8">블로그</div>
          <h1 className="reveal h-display text-[40px] sm:text-[56px] md:text-[80px] max-w-[18ch] ko">
            검색 권위에 대한<br />
            <span className="text-[#8e8e8e]">우리의 기록</span>
          </h1>
          <p className="reveal mt-10 text-[16px] md:text-[18px] leading-[1.65] text-[#c8c8c8] max-w-[58ch] ko">
            업계의 통념을 정리하고, 우리가 실제 작업에서 발견한 패턴을 공유합니다.
            마케팅 콘텐츠가 아니라, 일하면서 우리가 배운 것을 기록하는 공간입니다.
          </p>
        </div>
      </section>

      {/* Posts list */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          {POSTS.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="rule">
              {POSTS.map((post) => (
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
  // 글 페이지는 아직 없으므로 클릭 시 contact로 보냄
  // 실제 글 페이지 만들면 to={`/blog/${post.slug}`}로 변경
  return (
    <Link
      to="/contact"
      className="reveal group block py-10 md:py-12 border-b border-[#262626] hover:bg-[#141414] transition-colors -mx-5 md:-mx-8 px-5 md:px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
        <div className="md:col-span-2 flex items-center gap-3 md:block">
          <div className="eyebrow">{post.category}</div>
          <div className="text-[12px] text-[#5a5a5a] font-mono mt-0 md:mt-2">
            {formatDate(post.date)}
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.025em] leading-[1.25] ko">
            {post.title}
          </h2>
          <p className="mt-3 text-[14.5px] md:text-[15px] text-[#8e8e8e] leading-[1.7] ko">
            {post.excerpt}
          </p>
        </div>
        <div className="md:col-span-2 md:text-right">
          <div className="text-[12px] text-[#5a5a5a] font-mono">{post.readingTime}</div>
        </div>
        <div className="md:col-span-1 flex md:justify-end">
          <ArrowUpRight className="w-5 h-5 text-[#5a5a5a] group-hover:text-[#f0f0f0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 md:py-28">
      <div className="eyebrow mb-6">아직 글이 없습니다</div>
      <p className="text-[15px] md:text-[16px] text-[#8e8e8e] max-w-[40ch] mx-auto leading-relaxed ko">
        곧 첫 글이 올라옵니다.
        그 동안 어떤 주제를 다루는지 궁금하시면 직접 문의 주셔도 됩니다.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  // 2026-01-15 → 2026.01.15
  return iso.replace(/-/g, ".");
}
