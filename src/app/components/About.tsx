import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "정식 등록 정보만 소개합니다",
    desc: "정부에 등록된 국제결혼 중개업체 정보를 기준으로 안내합니다. 확인할 수 없는 업체는 노출하지 않습니다.",
  },
  {
    n: "02",
    title: "과장 없는 정보 중심",
    desc: "성공 보장, 무조건 성사 같은 문구 대신 절차·비용·체크리스트를 명확히 보여 드립니다.",
  },
  {
    n: "03",
    title: "계약 전 소비자 보호",
    desc: "상담 전 등록번호, 계약서, 환불 규정, 현지 지사 여부를 스스로 확인할 수 있게 돕습니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section bg-white/50">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_20px_50px_rgba(22,50,79,0.12)] md:aspect-[5/6]">
          <Image
            src={imageUrl(2)}
            alt={`${SITE.name} 안내`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-sm font-bold tracking-wide text-[var(--teal)]">OUR PROMISE</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            신뢰할 수 있는 정보로
            <br />
            첫 선택을 돕습니다
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            {SITE.brand}는 국제결혼 중개업체가 아닙니다. 절차와 비용을 이해하고, 정식 등록된
            업체를 비교할 수 있도록 돕는 정보 플랫폼입니다.
          </p>
          <div className="mt-8 space-y-5">
            {PROMISES.map((p) => (
              <div key={p.n} className="soft-card p-5">
                <p className="text-xs font-bold text-[var(--gold-deep)]">— 원칙 {p.n}</p>
                <h3 className="mt-1 text-lg font-bold text-[var(--navy)]">{p.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
