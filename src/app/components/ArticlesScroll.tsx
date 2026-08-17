import Link from "next/link";
import Image from "next/image";
import type { SeoPageSummary } from "@/lib/seo-pages";
import { pagePath } from "@/lib/seo-pages";
import { imageUrl } from "@/lib/images";

const MAIN_PREVIEW = 4;

function thumbFor(slug: string, image?: string) {
  if (image) return image;
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return imageUrl((Math.abs(h) % 10) + 1);
}

export default function ArticlesScroll({ pages }: { pages: SeoPageSummary[] }) {
  const preview = pages.slice(0, MAIN_PREVIEW);

  if (!preview.length) {
    return (
      <section id="articles" className="section bg-white/50">
        <div className="container">
          <p className="text-sm font-bold text-[var(--teal)]">Latest Guides</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)] md:text-3xl">
            <Link href="/guide" className="hover:text-[var(--gold-deep)]">
              최신 국제결혼 정보
            </Link>
          </h2>
          <p className="mt-3 text-[var(--muted)]">발행된 정보글이 여기에 제목과 썸네일로 노출됩니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="section bg-white/50">
      <div className="container">
        <p className="text-sm font-bold text-[var(--teal)]">Latest Guides</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)] md:text-3xl">
          <Link href="/guide" className="hover:text-[var(--gold-deep)]">
            최신 국제결혼 정보
          </Link>
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          최신 {MAIN_PREVIEW}건 —{" "}
          <Link href="/guide" className="underline hover:text-[var(--gold-deep)]">
            전체 목록 보기
          </Link>
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((p) => (
            <Link
              key={p.slug}
              href={pagePath(p.slug)}
              className="soft-card group transition hover:-translate-y-0.5 hover:border-[var(--teal)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={thumbFor(p.slug, p.image)}
                  alt={p.h1}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--teal)]">
                  {p.keyword}
                </span>
                <h3 className="mt-1 line-clamp-2 text-lg font-bold text-[var(--navy)]">{p.h1}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{p.metaDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
