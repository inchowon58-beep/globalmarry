# 국제결혼정보원

Next.js 15 기반 국제결혼 정보·정식 등록 업체 비교 플랫폼입니다.

글 발행·관리자·웹문서생성기는 구름이네 사이트 구조를 이식했고, 콘텐츠와 디자인은 국제결혼 정보 사이트용으로 다시 구성했습니다.

## 시작

```bash
npm install
npm run dev
```

## 주요 설정

- `src/lib/site.ts` — 사이트명, CDN, 도메인
- `src/lib/agencies.ts` — 제휴 업체 카드 (비어 있으면 `/agencies`에 “업체선정중입니다.” 표시)
- 이미지 CDN: `https://image.cattery.co.kr/weding/` (01.webp ~ 10.webp)
- SEO: `/guide/[slug]` + `tools/webdoc`
- 하단 CTA: 검증된 정식등록업체 확인 → `/agencies`

## 웹문서생성기

프로젝트 루트의 `국제결혼정보원_웹문서생성기.bat` 또는 `tools/webdoc/run.bat`
