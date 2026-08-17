import Link from "next/link";
import { BookOpen, CircleAlert, Globe2, Scale } from "lucide-react";

const CATEGORIES = [
  {
    href: "/guide",
    icon: Scale,
    title: "절차·비용",
    desc: "혼인 신고, 비자, 서류와 예상 비용을 단계별로 정리합니다.",
  },
  {
    href: "/guide",
    icon: CircleAlert,
    title: "피해 예방",
    desc: "미등록 업체, 과도한 선입금, 계약 전 필수 확인 항목을 안내합니다.",
  },
  {
    href: "/#countries",
    icon: Globe2,
    title: "국가별 가이드",
    desc: "베트남, 우즈베키스탄 등 주요 국가별 절차 차이를 확인하세요.",
  },
  {
    href: "/agencies",
    icon: BookOpen,
    title: "정식 등록 업체",
    desc: "정부에 등록된 국제결혼 중개업체를 비교할 수 있습니다.",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-[var(--teal)]">INFORMATION</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            필요한 정보만 먼저 확인하세요
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            광고보다 절차와 안전 정보를 앞에 둡니다. 상담은 확인된 업체에서 이어가세요.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.title} href={c.href} className="soft-card group p-6 transition hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--sky-soft)] text-[var(--teal)]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--navy)] group-hover:text-[var(--teal)]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{c.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
