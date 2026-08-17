/** 국제결혼정보원 — 사이트 공통 설정 */

export const SITE = {
  name: "국제결혼정보원",
  brand: "국제결혼정보원",
  farm: "국제결혼 정보",
  tagline: "올바른 정보가 행복한 시작입니다",
  taglineEn: "Trusted International Marriage Information",
  description:
    "국제결혼정보원은 절차·비용·피해 예방과 정부 정식 등록 업체 정보를 안내하는 국제결혼 정보 플랫폼입니다. 과장 광고가 아닌, 확인할 수 있는 정보를 우선합니다.",
  keywords: [
    "국제결혼",
    "국제결혼정보원",
    "국제결혼절차",
    "국제결혼비용",
    "국제결혼업체",
    "정식등록업체",
    "결혼중개업",
    "베트남국제결혼",
    "우즈베키스탄국제결혼",
    "필리핀국제결혼",
    "국제결혼상담",
    "국제결혼피해예방",
  ],
  phone: "0505-300-7779",
  phoneTel: "tel:05053007779",
  phoneDisplay: "0505-300-7779",
  logo: "https://image.cattery.co.kr/weding/01.webp",
  imageBase: "https://image.cattery.co.kr/weding",
  imageCount: 10,
  location: "대한민국 전국",
  address: "전국 정보 안내 · 제휴 문의",
  areaServed: "대한민국 전국",
  domain: "gukjeinfo",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://gukjeinfo.vercel.app",
  infocsUrl: "https://www.infocs.co.kr/",
  agenciesPath: "/agencies",
} as const;

export const CTA_LABEL = "검증된 정식등록업체 확인";
export const CTA_AGENCIES = "검증된 정식등록업체 확인";
export const CTA_GUIDE = "국가별 가이드 확인하기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
