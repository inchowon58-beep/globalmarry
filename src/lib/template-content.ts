import { SITE } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { extractKeywordTheme, extractRegionFromKeyword } from "./region-parse";
import { getSubRegionNames } from "./sub-region-map";
import { getNearbyStationNames } from "./subway-map";

const HERO = [
  "Trusted International Marriage Info",
  "Process, Cost & Registered Agencies",
  "Start with Verified Information",
  "Gukje Marriage Information Center",
];

const INTRO_H2 = [
  "{kw}, 왜 정확한 정보가 필요할까요",
  "{kw} 알아보기 전 꼭 확인할 점",
  "안전한 선택을 위한 {kw} 안내",
  "{kw}와 국제결혼정보원의 원칙",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}`);
  const kw = keyword.trim() || "국제결혼";
  const phone = SITE.phone;
  const brand = SITE.brand;
  const farm = SITE.farm;

  const title = `${kw} | ${brand} 절차·비용·정식등록업체`;
  const metaDescription = `${kw} 안내 — ${brand}에서 국제결혼 절차·비용·피해 예방과 정부 정식 등록 업체 비교 정보를 확인하세요.`;
  const h1 = `${kw} — ${brand} 정보 가이드`;

  const sections = [
    {
      h2: pick(INTRO_H2, seed).replace(/\{kw\}/g, kw),
      paragraphs: [
        `${kw}를 찾을 때 가장 중요한 것은 확인할 수 있는 정보입니다. ${farm} ${brand}는 혼인 절차, 예상 비용, 소비자 피해 예방 포인트를 한곳에서 안내합니다.`,
        `급하게 상담부터 받기보다, 정부 정식 등록 업체인지, 계약서와 환불 규정이 있는지를 먼저 확인하는 것이 안전합니다. ${brand}는 과장 광고보다 확인 가능한 정보를 우선합니다.`,
        `관심 국가와 거주 지역을 기준으로 필요 서류와 일정을 정리한 뒤, 업체 비교 페이지에서 등록번호와 상호를 대조해 보세요.`,
      ],
    },
    {
      h2: `${brand}가 ${kw}에서 지키는 원칙`,
      paragraphs: [
        `정식 등록 정보 안내, 계약 전 체크리스트, 국가별 절차 정리가 ${brand}의 기준입니다. 성공 보장이나 무조건 성사 같은 표현은 쓰지 않습니다.`,
        `${SITE.areaServed}에서 ${kw}를 알아보는 분들이 근거리 상담·서류 준비 범위를 함께 살펴볼 수 있도록 지역 정보도 연결합니다.`,
        `${kw}로 검색하셨다면 비용 총액만 보지 말고 중개 수수료, 항공·체류, 번역·공증, 추가 비용을 항목별로 확인하세요. 문의는 사이트 제휴·문의 양식을 이용해 주세요. ${phone}.`,
      ],
    },
    {
      h2: `${kw} 다음 단계`,
      paragraphs: [
        `${kw} 정보를 확인한 뒤에는 검증된 정식 등록 업체 비교 페이지로 이동해 상호·등록번호·전문 국가를 확인하세요.`,
        `${brand}는 중개 계약을 대리하지 않습니다. 최종 상담과 계약은 해당 업체와 직접 진행하시기 바랍니다.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `${kw} 정보는 어디서 확인하나요?`,
      a: `${brand} 정보 가이드와 업체 비교 페이지에서 절차·비용·정식 등록 정보를 확인할 수 있습니다. 제휴 문의는 사이트 하단 양식 또는 ${phone}으로 남겨 주세요.`,
    },
    {
      q: `정식 등록 업체만 소개하나요?`,
      a: `네. ${brand}는 정부 정식 등록 업체 정보만 안내하는 것을 원칙으로 합니다. 등록번호와 대표자·소재지를 계약 전에 다시 확인하세요.`,
    },
    {
      q: `전국에서 정보를 볼 수 있나요?`,
      a: `네. 전국 거주자를 대상으로 정보 가이드를 제공합니다. 지역명이 포함된 검색어는 근방 구·동 안내와 함께 보여 드립니다.`,
    },
  ];

  const tweak = seed % 3;
  if (tweak === 1) {
    sections[0].paragraphs[0] = sections[0].paragraphs[0].replace("안내합니다", "정리합니다");
  } else if (tweak === 2) {
    sections[1].paragraphs[0] = sections[1].paragraphs[0].replace("기준입니다", "약속입니다");
  }

  const now = new Date().toISOString();
  const region = extractRegionFromKeyword(kw);
  const theme = extractKeywordTheme(kw);
  const areas = getSubRegionNames(region, 5);
  const stations = getNearbyStationNames(region, 5);
  const geoKw = [
    ...areas.map((a) => `${a} ${theme}`),
    ...stations.map((s) => `${s} ${theme}`),
  ].join(", ");
  let metaDescriptionFinal = metaDescription;
  if (areas.length || stations.length) {
    const nearBits = [...areas.slice(0, 3), ...stations.slice(0, 3)].slice(0, 4).join(" · ");
    metaDescriptionFinal = `${metaDescription} 근방·인근(${nearBits}) ${theme} 검색 안내.`;
  }
  return {
    slug: slugifyKeyword(kw, `t${pageIndex}${seed.toString(36).slice(0, 4)}`),
    keyword: kw,
    title,
    metaDescription: metaDescriptionFinal,
    metaKeywords: `${kw}, 국제결혼, 국제결혼정보원, 국제결혼절차, 국제결혼비용, 국제결혼업체, 정식등록업체, 결혼중개업${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle: pick(HERO, seed),
    heroBadge: "정식 등록 정보",
    heroTitleLine1: kw,
    heroTitleLine2: "절차 · 비용 · 업체 비교",
    heroBar: "올바른 정보가 행복한 시작입니다",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `검증된 정식등록업체 확인 — ${brand}`,
    createdAt: now,
    updatedAt: now,
  };
}
