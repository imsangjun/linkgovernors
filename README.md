# LinkPresso

검색 권위를 설계하는 SEO 실행 파트너.

## 스택

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (CSS-first, `@theme` 토큰)
- **react-router v7** (라우트 단위 코드 스플리팅)
- **Supabase** (lead capture)
- **Vercel** (호스팅)

## 디자인 원칙

1. **블랙 & 화이트가 메인** — 배경 `#fff`, 텍스트 `#0a0a0a`
2. **빨간색은 온점 1개** — 헤더 로고 끝의 점 하나에만 사용. 본문에는 일절 없음
3. **한국어 본문 가독성 우선** — Pretendard Variable, `word-break: keep-all`

## 시작하기

```bash
# 의존성 설치
pnpm install   # 또는 npm install / yarn

# 환경변수 설정 (선택 — Supabase 사용 시)
cp .env.example .env
# .env에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 입력

# 개발 서버
pnpm dev
```

## Supabase 설정 (선택)

Contact 폼이 작동하려면 `leads` 테이블이 필요합니다:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  email text not null,
  company text,
  budget text,
  message text,
  source text,
  created_at timestamptz default now()
);

-- RLS는 필요에 맞게 설정
alter table public.leads enable row level security;
create policy "anyone can insert" on public.leads
  for insert with check (true);
```

환경변수가 없으면 폼은 콘솔에 로그만 남기고 정상적으로 success 화면을 띄웁니다 (개발 편의).

## 디렉토리 구조

```
src/
├── main.tsx                      # 진입점
├── styles/
│   └── index.css                 # Tailwind v4 + 디자인 토큰
└── app/
    ├── routes.tsx                # 라우트 + lazy loading
    ├── components/
    │   ├── Root.tsx              # 레이아웃 (nav + outlet + footer)
    │   ├── Home.tsx              # / (가장 묵직한 페이지)
    │   ├── Services.tsx          # /services
    │   ├── Cases.tsx             # /cases
    │   ├── About.tsx             # /about
    │   ├── Contact.tsx           # /contact (Supabase 연동)
    │   ├── Terms.tsx             # /terms
    │   ├── Privacy.tsx           # /privacy
    │   └── NotFound.tsx          # 404
    └── lib/
        ├── supabaseClient.ts     # Supabase 초기화
        ├── useRevealOnScroll.ts  # 인뷰 애니메이션
        └── utils.ts              # cn() 유틸
```

## 채워넣어야 할 플레이스홀더

처음부터 운영 단계로 가려면 다음 정보를 실제 값으로 교체해주세요:

- **Footer 사업자 정보** (`Root.tsx`): 대표자, 사업자등록번호, 소재지
- **이메일 주소** (`hello@linkpresso.kr` 검색해서 일괄 교체)
- **사례 수치** (`Home.tsx`, `Cases.tsx`): 현재는 가상 예시
- **클라이언트 로고** (`Home.tsx` Proof 섹션): 6개 가짜 이름
- **팀 통계** (`About.tsx`): 9명/14년/3개국/12 — 실제 수치로
- **약관·방침 조항** (`Terms.tsx`, `Privacy.tsx`): 법무 검토 필수

## 배포

Vercel에 연결하고 환경변수만 설정하면 됩니다. `vercel.json`에 SPA rewrites가 이미 설정되어 있습니다.

```bash
pnpm build
pnpm preview  # dist/ 미리보기
```
