import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const COUNTRIES = [
  { name: "베트남", desc: "혼인 신고·인터뷰·서류 절차를 중심으로 정리합니다.", img: 3 },
  { name: "우즈베키스탄", desc: "현지 서류와 국내 신고 순서를 확인하세요.", img: 5 },
  { name: "필리핀", desc: "인증·번역·공증 준비 항목을 안내합니다.", img: 7 },
  { name: "캄보디아", desc: "등록 업체 여부와 계약 전 체크리스트가 중요합니다.", img: 9 },
];

export default function Countries() {
  return (
    <section id="countries" className="section">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold tracking-wide text-[var(--teal)]">COUNTRIES</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
              국가별 가이드
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              나라마다 서류와 일정이 다릅니다. 관심 국가의 정보글을 먼저 확인한 뒤 정식 등록 업체를 비교하세요.
            </p>
          </div>
          <Link href="/guide" className="btn-sky shrink-0">
            전체 가이드 보기
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {COUNTRIES.map((c) => (
            <Link key={c.name} href="/guide" className="soft-card group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={imageUrl(c.img)}
                  alt={`${c.name} 국제결혼 가이드 — ${SITE.name}`}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[0.65rem] font-bold text-[var(--navy)] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
                  {c.name}
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-base font-extrabold text-[var(--navy)] sm:text-lg">{c.name} 국제결혼</h3>
                <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
