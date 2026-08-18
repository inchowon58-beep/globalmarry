"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { SITE, CTA_LABEL } from "@/lib/site";

const NAV = [
  { href: "/#categories", label: "정보 카테고리" },
  { href: "/#process", label: "절차안내" },
  { href: "/guide", label: "국가별 가이드" },
  { href: "/agencies", label: "정식등록업체" },
  { href: "/#contact", label: "제휴·문의" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(250,248,244,0.92)] backdrop-blur-md">
      <div className="trust-pulse flex items-center justify-center gap-2 bg-[var(--navy)] px-3 py-2 text-center text-[0.78rem] font-semibold text-white md:text-sm">
        <ShieldCheck size={14} />
        <span>정부 정식 등록 업체 정보 · 과장 없는 국제결혼 안내</span>
      </div>

      <div className="container flex h-14 items-center justify-between md:h-16">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-[0.7rem] font-semibold tracking-wide text-[var(--teal)]">
            {SITE.farm}
          </span>
          <span className="text-lg font-extrabold tracking-tight text-[var(--navy)] md:text-xl">
            {SITE.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--gold-deep)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/agencies"
            className="header-cta hidden md:inline-flex"
          >
            {CTA_LABEL}
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-[var(--navy)] lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--navy)] hover:bg-[var(--sky-soft)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/agencies"
              className="header-cta mt-1 w-full"
              onClick={() => setOpen(false)}
            >
              {CTA_LABEL}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
