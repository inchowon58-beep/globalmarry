import { GoogleGenerativeAI } from "@google/generative-ai";
import { SITE } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function buildPrompt(keyword: string): string {
  return `당신은 '${SITE.farm} ${SITE.brand}'의 SEO·AEO 웹문서 작성 전문가입니다.
업체명은 반드시 '${SITE.farm}', '${SITE.brand}', '${SITE.name}'만 사용하세요.

메인 키워드: ${keyword}
핵심 키워드: 국제결혼
전화: ${SITE.phone}
서비스 범위: ${SITE.areaServed}

주제: 국제결혼 절차, 비용, 피해 예방, 정부 정식 등록 업체 비교, 국가별 혼인·비자 안내.
${SITE.name}는 중개업체가 아니라 정보 플랫폼입니다.

아래 JSON만 출력. 설명 금지.

{
  "title": "60자 내. '{keyword}' + 국제결혼 또는 국제결혼정보원 포함",
  "metaDescription": "140~160자. '{keyword}', 절차, 비용, 정식등록업체 유도",
  "metaKeywords": "{keyword}, 국제결혼, 국제결혼정보원, 국제결혼절차, 국제결혼비용 등 8~12개",
  "h1": "키워드 '{keyword}' 포함 H1",
  "heroSubtitle": "영문 짧은 부제 또는 한영 혼합 한 문장",
  "sections": [
    {"h2": "소제목1 (키워드 포함)", "paragraphs": ["180자+", "160자+", "160자+"]},
    {"h2": "소제목2", "paragraphs": ["180자+", "160자+", "140자+"]},
    {"h2": "소제목3", "paragraphs": ["160자+", "160자+"]}
  ],
  "faqs": [
    {"q": "질문1", "a": "답변 80자+"},
    {"q": "질문2", "a": "답변 80자+"},
    {"q": "질문3", "a": "답변 80자+"}
  ],
  "ctaText": "정식 등록 업체 비교 안내 문장"
}

요구: 과장·허위·성공 보장 금지. AEO(질문형 FAQ). 본문에 '{keyword}'와 '국제결혼' 자연 반복.`;
}

export async function generateWithGemini(
  keyword: string,
  apiKey?: string
): Promise<
  Omit<SeoPage, "slug" | "images" | "createdAt" | "updatedAt"> & { keyword: string }
> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY가 없습니다.");

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: MODEL });
  const result = await model.generateContent(buildPrompt(keyword));
  const text = result.response.text();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = (fence ? fence[1] : text).trim();
  const data = JSON.parse(jsonStr);

  return {
    keyword,
    title: String(data.title || `${keyword} | ${SITE.name}`),
    metaDescription: String(data.metaDescription || SITE.description),
    metaKeywords: String(data.metaKeywords || keyword),
    h1: String(data.h1 || keyword),
    heroSubtitle: String(data.heroSubtitle || SITE.taglineEn),
    sections: Array.isArray(data.sections) ? data.sections : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    ctaText: String(data.ctaText || `검증된 정식등록업체 확인 — ${SITE.brand}`),
  };
}

export function assembleSeoPage(
  partial: Awaited<ReturnType<typeof generateWithGemini>>,
  slug?: string
): SeoPage {
  const now = new Date().toISOString();
  return {
    slug: slug || slugifyKeyword(partial.keyword),
    keyword: partial.keyword,
    title: partial.title,
    metaDescription: partial.metaDescription,
    metaKeywords: partial.metaKeywords,
    h1: partial.h1,
    heroSubtitle: partial.heroSubtitle,
    heroBadge: "정식 등록 정보",
    heroTitleLine1: partial.keyword,
    heroTitleLine2: "절차 · 비용 · 업체 비교",
    heroBar: "올바른 정보가 행복한 시작입니다",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
