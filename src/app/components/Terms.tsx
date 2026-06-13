import { useRevealOnScroll } from "../lib/useRevealOnScroll";

export function Terms() {
  useRevealOnScroll();

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <div className="reveal eyebrow mb-6">법적 고지</div>
        <h1 className="reveal h-display text-[36px] md:text-[56px] mb-12 ko">이용약관</h1>

        <div className="reveal text-[12px] text-[#5a5a5a] font-mono mb-12 pb-6 border-b border-[#262626]">
          최종 업데이트 · 2026년 1월 1일 · v1.0
        </div>

        <div className="reveal space-y-10 text-[14.5px] md:text-[15px] leading-[1.8] text-[#c8c8c8] ko">
          <Article num="1" title="목적">
            본 약관은 LinkPresso(이하 "회사")가 제공하는 SEO 컨설팅 및 백링크 빌딩
            서비스(이하 "서비스")의 이용 조건과 절차, 회사와 회원의 권리·의무 및 책임 사항
            등 기본적인 사항을 규정함을 목적으로 합니다.
          </Article>

          <Article num="2" title="용어의 정의">
            "회원"은 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 개인 또는 법인을
            의미합니다. "서비스"는 회사가 제공하는 백링크 빌딩, 온페이지 SEO,
            토픽 클러스터 설계 등 일체의 디지털 마케팅 서비스를 의미합니다.
          </Article>

          <Article num="3" title="서비스 제공 범위와 한계">
            회사는 구글 검색 가이드라인에 부합하는 화이트햇 SEO 서비스만 제공합니다. 회사는
            특정 키워드에서의 1위 노출, 즉각적인 트래픽 증가 등 외부 변수에 의해 좌우되는
            결과를 보장하지 않습니다. 회사는 합의된 KPI 범위 내에서 최선의 노력을 다할 의무를
            집니다.
          </Article>

          <Article num="4" title="계약 및 해지">
            서비스 계약은 최소 3개월 단위로 체결됩니다. 회원은 계약 만료 30일 전까지 해지를
            통보할 수 있습니다. 회사는 회원이 본 약관 또는 관련 법령을 위반하는 경우 사전
            통보 후 계약을 해지할 수 있습니다.
          </Article>

          <Article num="5" title="환불">
            엔터프라이즈 플랜에서 계약 시점에 합의된 KPI에 도달하지 못한 경우, 마지막 분기
            비용을 환불합니다. KPI는 양 당사자가 합리적으로 합의한 수준에서만 설정됩니다.
            기타 자세한 환불 조건은 개별 계약서에 따릅니다.
          </Article>

          <Article num="6" title="저작권 및 작업 결과물">
            회사가 작업 과정에서 제작한 콘텐츠와 분석 리포트의 저작권은 클라이언트에게
            귀속됩니다. 단, 회사는 작업 과정에서 축적된 일반화된 노하우와 도메인 풀, 매체
            네트워크에 대한 권리를 보유합니다.
          </Article>

          <Article num="7" title="비밀유지">
            회사는 서비스 제공 과정에서 알게 된 회원의 비공개 정보, 영업 비밀, 전략 등을
            회원의 사전 동의 없이 제3자에게 제공하거나 외부에 공개하지 않습니다. 본 의무는
            계약 종료 후 3년간 유효합니다.
          </Article>

          <Article num="8" title="면책">
            회사는 천재지변, 검색엔진 알고리즘의 급격한 변경, 회원의 도메인에서 회사 작업과
            무관하게 발생한 페널티 등 회사의 합리적 통제를 벗어난 사유로 인한 손해에 대해
            책임을 지지 않습니다.
          </Article>

          <Article num="9" title="분쟁 해결">
            본 약관에 관한 분쟁은 대한민국 법령을 따르며, 관할 법원은 서울중앙지방법원으로
            합니다.
          </Article>
        </div>
      </div>
    </section>
  );
}

function Article({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[18px] md:text-[20px] font-semibold tracking-[-0.02em] text-[#f0f0f0] mb-4 ko">
        제 {num} 조 · {title}
      </h2>
      <p>{children}</p>
    </div>
  );
}
