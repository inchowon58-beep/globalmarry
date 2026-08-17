import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { AGENCIES } from "@/lib/agencies";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--navy-deep)] py-12 text-white">
      <div className="container grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block">
            <p className="text-sm font-semibold text-[#9ec9cf]">{SITE.farm}</p>
            <h2 className="mt-1 text-2xl font-extrabold hover:text-[var(--gold)]">{SITE.brand}</h2>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
            절차·비용·피해 예방 정보를 중심으로, 정부 정식 등록 업체를 비교할 수 있도록 안내합니다.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold text-[var(--gold)]">사이트맵</p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link href="/guide" className="hover:text-white">정보 가이드</Link>
            <Link href="/agencies" className="hover:text-white">정식등록업체</Link>
            <Link href="/#process" className="hover:text-white">절차안내</Link>
            <Link href="/#contact" className="hover:text-white">제휴 문의</Link>
            <Link href="/privacy" className="hover:text-white">개인정보처리방침</Link>
          </nav>
        </div>

        <div className="space-y-3 text-sm text-white/80">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--gold)]" />
            {SITE.location} · {SITE.address}
          </p>
          <Link
            href="/admin"
            className="inline-flex rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/50 hover:bg-white/10 hover:text-white"
          >
            관리자 로그인
          </Link>
          <p className="pt-2 text-xs text-white/45">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>

      <div className="container mt-10 border-t border-white/10 pt-8">
        <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--gold)]">
          <ShieldCheck size={14} />
          광고 매체 고지 · 제휴 업체 정보
        </p>
        {AGENCIES.length > 0 ? (
          <ul className="mt-4 grid gap-3 text-xs text-white/70 sm:grid-cols-2">
            {AGENCIES.map((a) => (
              <li key={a.id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="font-semibold text-white">{a.name}</p>
                <p className="mt-1">등록번호 {a.registrationNo} · 대표 {a.ceo}</p>
                <p>{a.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-white/55">
            현재 광고 게재 업체를 선정하고 있습니다. 정식 등록 업체 정보는 추후 이 영역에 명시됩니다.
          </p>
        )}
      </div>
    </footer>
  );
}
