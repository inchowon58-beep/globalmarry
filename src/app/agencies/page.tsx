import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import AgencyCards from "@/app/components/AgencyCards";

export const metadata: Metadata = {
  title: "검증된 국제결혼 업체 비교 및 안내",
  description: `${SITE.name}는 정부 정식 등록 국제결혼 중개업체 정보만 제공합니다. 계약 전 체크리스트를 확인하세요.`,
  keywords: [...SITE.keywords, "국제결혼업체비교", "결혼중개업등록"],
  alternates: { canonical: `${SITE.siteUrl}/agencies` },
  openGraph: {
    title: `검증된 국제결혼 업체 비교 및 안내 | ${SITE.name}`,
    description: "정부 정식 등록 업체 정보만 안내합니다.",
    url: `${SITE.siteUrl}/agencies`,
    images: [{ url: SITE.logo, alt: SITE.name }],
  },
};

export default function AgenciesPage() {
  return (
    <div className="container min-h-screen py-16 md:py-24">
      <p className="text-sm font-bold tracking-wide text-[var(--teal)]">VERIFIED AGENCIES</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
        검증된 국제결혼 업체 비교 및 안내
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        상담 신청 전에 등록번호·대표자·소재지를 확인하고, 계약서와 환불 규정을 반드시 점검하세요.
      </p>

      <div className="callout mt-8 flex gap-3">
        <ShieldCheck className="mt-0.5 shrink-0 text-[var(--gold-deep)]" size={20} />
        <p>
          본 플랫폼은 정부 정식 등록 업체 정보만 제공합니다. 계약 전 필수 체크리스트를 확인하세요.
          {SITE.name}는 중개 계약을 대리하지 않으며, 최종 계약은 해당 업체와 직접 체결됩니다.
        </p>
      </div>

      <div className="mt-10">
        <AgencyCards />
      </div>
    </div>
  );
}
