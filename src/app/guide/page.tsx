import type { Metadata } from "next";
import Link from "next/link";
import { listPageSummaries, pagePath } from "@/lib/seo-pages";
import { SITE, absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "국제결혼 정보 가이드",
  description: `${SITE.name} 절차·비용·국가별 국제결혼 안내글 모음`,
  keywords: [...SITE.keywords, "국제결혼가이드"],
  alternates: { canonical: absoluteUrl("/guide") },
  openGraph: {
    title: `국제결혼 정보 가이드 | ${SITE.name}`,
    description: `${SITE.name} 절차·비용·피해 예방 가이드`,
    url: absoluteUrl("/guide"),
    images: [{ url: SITE.logo, alt: SITE.name }],
  },
};

const PAGE_SIZE = 25;

type Props = { searchParams: Promise<{ page?: string }> };

export default async function GuideIndexPage({ searchParams }: Props) {
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const all = await listPageSummaries();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);
  const current = Math.min(pageNum, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const slice = all.slice(start, start + PAGE_SIZE);

  return (
    <div className="container min-h-screen py-16 md:py-24">
      <p className="text-sm font-bold text-[var(--teal)]">Archive</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
        국제결혼 정보 가이드
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">
        총 {total}건 · 절차·비용·국가별 안내
      </p>

      <ul className="mt-10 divide-y divide-[var(--line)] overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white">
        {slice.length === 0 && (
          <li className="px-5 py-8 text-[var(--muted)]">등록된 안내글이 없습니다.</li>
        )}
        {slice.map((p, i) => {
          const no = start + i + 1;
          return (
            <li key={p.slug}>
              <Link
                href={pagePath(p.slug)}
                className="flex gap-4 px-5 py-4 transition hover:bg-[var(--sky-soft)]"
              >
                <span className="w-10 shrink-0 text-xl font-bold text-[var(--gold-deep)]">
                  {String(no).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-xs text-[var(--teal)]">{p.keyword}</div>
                  <div className="text-xl font-bold text-[var(--navy)]">{p.h1}</div>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
                    {p.metaDescription}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {totalPages >= 1 && (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="페이지">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={n === 1 ? "/guide" : `/guide?page=${n}`}
              className={`min-w-9 rounded-full px-2 py-1 text-center text-sm ${
                n === current
                  ? "bg-[var(--navy)] text-white"
                  : "rounded-xl border border-[var(--line)] bg-white text-[var(--ink)]"
              }`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
