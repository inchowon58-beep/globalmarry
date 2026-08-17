import { SITE } from "./site";

export type FaqItem = { q: string; a: string };

export const HOME_FAQS: FaqItem[] = [
  {
    q: "국제결혼정보원은 결혼 중개업체인가요?",
    a: `${SITE.name}는 중개업체가 아니라 정보 플랫폼입니다. 절차·비용·피해 예방 정보를 제공하고, 정부 정식 등록 업체를 비교할 수 있도록 안내합니다.`,
  },
  {
    q: "정식 등록 업체는 어떻게 확인하나요?",
    a: "업체 비교 페이지에서 상호, 등록번호, 대표자, 소재지를 확인할 수 있습니다. 계약 전에는 해당 정보를 공식 등록 내역과 한 번 더 대조하세요.",
  },
  {
    q: "국제결혼 비용은 얼마인가요?",
    a: "국가·서류·체류 일정에 따라 달라집니다. 총액만 보지 말고 중개 수수료, 항공, 체류, 번역·공증, 추가 비용을 항목별로 확인하는 것이 안전합니다.",
  },
  {
    q: "미등록 업체와 계약하면 안 되나요?",
    a: "결혼중개업은 등록이 필요한 사업입니다. 등록번호가 없거나 확인되지 않는 업체와의 계약은 분쟁 시 보호가 어려울 수 있습니다.",
  },
  {
    q: "국가마다 절차가 다른가요?",
    a: "네. 베트남, 우즈베키스탄, 필리핀 등 국가별로 혼인 요건과 서류가 다릅니다. 국가별 가이드를 먼저 확인한 뒤 상담을 진행하세요.",
  },
  {
    q: "제휴·광고 문의는 어떻게 하나요?",
    a: `사이트 하단 문의 양식에서 '제휴·광고 문의'를 선택해 접수하시면 됩니다. 정식 등록 업체만 검토합니다.`,
  },
];

export function faqJsonLd(faqs: FaqItem[] = HOME_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: [SITE.brand, SITE.farm],
    description: SITE.description,
    url: SITE.siteUrl,
    telephone: SITE.phone,
    image: SITE.logo,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: SITE.address,
    },
    areaServed: SITE.areaServed,
    keywords: SITE.keywords.join(", "),
  };
}
