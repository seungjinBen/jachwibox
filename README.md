# 자취박스

처음 자취를 시작하는 사람들을 위한 필수템 큐레이션 + 비용 계산 웹서비스.

방 유형(원룸 오픈형·분리형·투룸)과 계절에 맞는 자취 필수템을 추천하고, 쿠팡 최저가 상품을 바로 확인할 수 있습니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript (strict mode) |
| 스타일 | Tailwind CSS v3 |
| DB | Supabase (PostgreSQL) |
| AI | Anthropic Claude API (claude-sonnet-4-5) |
| 배포 | Vercel |
| 수익 | 쿠팡 파트너스 |

---

## 로컬 개발 환경 세팅

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repository-url>
cd jachwibox
npm install
```

### 2. 환경변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local`을 열고 아래 값을 채워주세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_COUPANG_PARTNER_ID=your-partner-id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Supabase 스키마 적용

[Supabase 대시보드](https://supabase.com/dashboard) → 해당 프로젝트 → SQL Editor에서 아래 파일을 실행하세요:

```
supabase/schema.sql
```

테이블 생성 순서: `categories` → `items` → `products` → `seasonal_tips` → `ai_cache`

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다.

---

## 환경변수 설명

| 변수명 | 설명 | 공개 여부 |
|--------|------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 공개 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 | 공개 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서비스 롤 키 (서버 전용) | **비공개** |
| `ANTHROPIC_API_KEY` | Claude API 키 (서버 전용) | **비공개** |
| `NEXT_PUBLIC_COUPANG_PARTNER_ID` | 쿠팡 파트너스 ID | 공개 |
| `NEXT_PUBLIC_SITE_URL` | 배포 URL (OG 이미지 기준) | 공개 |

> `SUPABASE_SERVICE_ROLE_KEY`와 `ANTHROPIC_API_KEY`는 절대 클라이언트에 노출하지 마세요.

---

## GitHub Actions Secrets 등록 (Keep-Alive용)

Supabase 무료 플랜은 7일 이상 DB 요청이 없으면 자동 일시정지됩니다.
GitHub Actions로 5일마다 자동 ping을 보내 활성 상태를 유지합니다.

**등록 방법:** GitHub 저장소 → Settings → Secrets and variables → Actions → New repository secret

| Secret 이름 | 값 |
|-------------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 |

등록 후 `.github/workflows/supabase-keep-alive.yml`이 5일마다 자동 실행됩니다.
Actions 탭에서 수동으로도 실행할 수 있습니다(workflow_dispatch).

---

## Vercel 배포

### 1. Vercel 프로젝트 생성

[Vercel Dashboard](https://vercel.com/dashboard) → Add New → Project → GitHub 저장소 연결

### 2. 환경변수 등록

Vercel 프로젝트 → Settings → Environment Variables에서 `.env.local`의 모든 변수를 등록합니다.
`NEXT_PUBLIC_SITE_URL`은 실제 배포 URL로 설정하세요 (예: `https://jachwibox.vercel.app`).

### 3. 배포

`main` 브랜치에 push하면 자동으로 배포됩니다.

```bash
git push origin main
```

---

## 프로젝트 구조

```
jachwibox/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 랜딩 페이지
│   ├── setup/page.tsx      # 방 유형 선택
│   ├── checklist/page.tsx  # 체크리스트
│   ├── seasonal/page.tsx   # 계절 가이드
│   └── api/                # API Routes
├── components/             # UI 컴포넌트
├── lib/                    # 유틸리티 (supabase, anthropic, cache 등)
├── types/index.ts          # 전역 타입 정의
├── data/seed/              # 초기 시드 데이터
└── supabase/schema.sql     # DB 스키마
```
