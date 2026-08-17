import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";

type Props = {
  regionLabel?: string;
};

export default function AgencyBanner({ regionLabel }: Props) {
  const where = regionLabel ? `${regionLabel} ` : "이 지역/국가 ";

  return (
    <aside className="mt-10 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,var(--navy)_0%,var(--teal)_100%)] p-6 text-white shadow-[0_16px_40px_rgba(22,50,79,0.22)] md:p-8">
      <p className="flex items-center gap-2 text-sm font-semibold text-[var(--gold)]">
        <ShieldCheck size={16} />
        정식 등록 업체만 안내
      </p>
      <h2 className="mt-2 text-xl font-extrabold leading-snug md:text-2xl">
        {where}정식 등록된 안전한 국제결혼 업체 비교하기
      </h2>
      <p className="mt-2 max-w-xl text-sm text-white/75">
        정부 등록번호와 상호·대표자 정보를 확인할 수 있는 업체만 소개합니다. 계약 전 체크리스트도 함께 보세요.
      </p>
      <Link href={SITE.agenciesPath} className="btn-primary mt-5 inline-flex">
        업체 비교 페이지 이동
        <ArrowRight size={18} />
      </Link>
    </aside>
  );
}
