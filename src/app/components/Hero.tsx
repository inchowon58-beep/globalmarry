import { ArrowRight } from "lucide-react";
import { SITE, CTA_GUIDE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

export default function Hero() {
  const poster = imageUrl(1);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0 hero-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={`${SITE.name} 대표 이미지`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,34,56,0.55)_0%,rgba(14,34,56,0.42)_40%,rgba(14,34,56,0.78)_100%)]" />

      <div className="container relative flex min-h-[100svh] flex-col justify-end pb-32 pt-32 md:justify-center md:pb-24 md:pt-28">
        <p className="animate-rise text-sm font-semibold tracking-[0.08em] text-[var(--gold)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
          {SITE.farm} · {SITE.taglineEn}
        </p>
        <h1 className="animate-rise-delay mt-3 max-w-3xl text-3xl font-extrabold drop-shadow-[0_3px_14px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl">
          국제결혼, 올바른 정보가
          <span className="mt-2 block">행복한 시작입니다.</span>
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-xl text-base text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] md:text-lg">
          절차부터 비용, 정식 등록 업체 비교까지 한 번에 확인하세요.
        </p>
        <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
          <a href="#categories" className="btn-primary">
            {CTA_GUIDE}
            <ArrowRight size={18} />
          </a>
          <a href="/agencies" className="btn-secondary !border-white/80 !bg-black/25 backdrop-blur-sm">
            검증된 정식등록업체 확인
          </a>
        </div>
      </div>
    </section>
  );
}
