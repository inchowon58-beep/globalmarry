import Image from "next/image";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { AGENCIES, type Agency } from "@/lib/agencies";
import { imageUrl } from "@/lib/images";

function AgencyCard({ agency, index }: { agency: Agency; index: number }) {
  const img = agency.image || agency.logo || imageUrl((index % 10) + 1);

  return (
    <article className="soft-card flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={img}
          alt={`${agency.name} 대표 이미지`}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-extrabold text-[var(--navy)]">{agency.name}</h3>
        <p className="mt-1 text-sm font-semibold text-[var(--teal)]">
          전문 국가 · {agency.countries.join(" · ")}
        </p>
        <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
          {agency.features.slice(0, 3).map((f) => (
            <li key={f}>· {f}</li>
          ))}
        </ul>
        <div className="mt-4 rounded-xl bg-[var(--bg)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
          <p>등록번호 {agency.registrationNo}</p>
          <p>대표 {agency.ceo}</p>
          <p className="flex items-start gap-1">
            <MapPin size={12} className="mt-0.5 shrink-0" />
            {agency.address}
          </p>
          <p className="flex items-center gap-1">
            <Phone size={12} />
            {agency.phone}
          </p>
        </div>
        <a
          href={agency.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sky mt-5 w-full"
        >
          {agency.ctaLabel}
        </a>
      </div>
    </article>
  );
}

export default function AgencyCards() {
  if (AGENCIES.length === 0) {
    return (
      <div className="soft-card mx-auto max-w-xl px-8 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sky-soft)] text-[var(--teal)]">
          <ShieldCheck size={28} />
        </div>
        <p className="mt-6 text-2xl font-extrabold text-[var(--navy)]">업체선정중입니다.</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          정부 정식 등록 여부를 확인한 뒤 업체 카드를 공개할 예정입니다.
          선정 완료 시 이 페이지에서 상호·등록번호·전문 국가를 바로 비교하실 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {AGENCIES.map((agency, i) => (
        <AgencyCard key={agency.id} agency={agency} index={i} />
      ))}
    </div>
  );
}
