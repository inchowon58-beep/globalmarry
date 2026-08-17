import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl, galleryAlt } from "@/lib/images";

const INDICES = [3, 4, 5, 6, 7, 8, 9, 10];

export default function Gallery() {
  return (
    <section id="gallery" className="section bg-white/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-[var(--teal)]">MOMENTS</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            새로운 시작의 풍경
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}가 전하는 국제결혼 정보 페이지의 시각 자료입니다.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {INDICES.map((i) => (
            <div key={i} className="rounded-media relative aspect-square overflow-hidden shadow-sm">
              <Image
                src={imageUrl(i)}
                alt={galleryAlt(i)}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
