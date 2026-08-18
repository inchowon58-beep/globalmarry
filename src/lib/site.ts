/** 국제결혼정보원 — 사이트 공통 설정 */

const FALLBACK_ORIGIN = "https://www.globalmarry.co.kr";

/** 수집기(Yeti)가 200을 받는 최종 공개 주소. 끝 슬래시 없음, https·www 고정. */
export function publicOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_ORIGIN).trim();
  try {
    const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") {
      return u.origin.replace(/\/$/, "");
    }
    // 미리보기/구 호스트·비www는 수집용 최종 도메인으로 통일
    if (
      u.hostname.endsWith(".vercel.app") ||
      u.hostname === "globalmarry.co.kr" ||
      u.hostname === "gukjeinfo.vercel.app"
    ) {
      return FALLBACK_ORIGIN;
    }
    u.protocol = "https:";
    u.hash = "";
    u.search = "";
    u.pathname = "";
    return u.origin.replace(/\/$/, "");
  } catch {
    return FALLBACK_ORIGIN;
  }
}

export function absoluteUrl(path = "/"): string {
  const origin = publicOrigin();
  if (!path || path === "/") return origin;
  const p = (path.startsWith("/") ? path : `/${path}`).replace(/\/+$/, "");
  return `${origin}${p}`;
}

export function guidePageUrl(slug: string): string {
  return absoluteUrl(`/guide/${encodeURIComponent(slug)}`);
}

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
  get siteUrl() {
    return publicOrigin();
  },
  infocsUrl: "https://www.infocs.co.kr/",
  agenciesPath: "/agencies",
} as const;

export const CTA_LABEL = "검증된 정식등록업체 확인";
export const CTA_AGENCIES = "검증된 정식등록업체 확인";
export const CTA_GUIDE = "국가별 가이드 확인하기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
