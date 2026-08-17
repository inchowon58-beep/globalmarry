import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE.name} 개인정보처리방침`,
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE.siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="container min-h-screen py-16 md:py-24">
      <p className="text-sm font-bold text-[var(--teal)]">PRIVACY</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--navy)]">개인정보처리방침</h1>
      <div className="guide-prose mt-8 max-w-3xl space-y-6 text-[var(--muted)]">
        <p>
          {SITE.name}(이하 “플랫폼”)은 문의 접수와 제휴 연락을 위해 필요한 최소한의 개인정보만
          수집·이용합니다.
        </p>
        <h2 className="text-xl font-bold text-[var(--navy)]">1. 수집 항목</h2>
        <p>성함, 연락처, 지역(선택), 문의 유형, 문의 내용</p>
        <h2 className="text-xl font-bold text-[var(--navy)]">2. 이용 목적</h2>
        <p>문의 확인, 제휴·정보 안내 회신, 서비스 개선</p>
        <h2 className="text-xl font-bold text-[var(--navy)]">3. 보유 기간</h2>
        <p>문의 처리 완료 후 관련 법령이 정한 기간 또는 목적 달성 시까지 보관 후 파기합니다.</p>
        <h2 className="text-xl font-bold text-[var(--navy)]">4. 문의</h2>
        <p>
          개인정보 관련 문의는 사이트 하단 제휴·문의 양식 또는 관리자를 통해 접수해 주세요.
        </p>
        <p className="pt-4">
          <Link href="/" className="font-semibold text-[var(--teal)] underline">
            홈으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
