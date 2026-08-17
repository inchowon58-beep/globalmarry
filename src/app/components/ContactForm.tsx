"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { SITE } from "@/lib/site";

type FormState = {
  name: string;
  phone: string;
  address: string;
  product: string;
  quantity: string;
  memo: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  address: "",
  product: "정보문의",
  quantity: "1",
  memo: "",
};

const TOPICS = [
  { id: "정보문의", label: "절차·비용 문의" },
  { id: "업체문의", label: "정식등록업체 문의" },
  { id: "제휴문의", label: "제휴·광고 문의" },
  { id: "기타", label: "기타 문의" },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          address: form.address.trim() || "미입력",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "문의 접수에 실패했습니다.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "문의 접수에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section id="contact" className="section bg-white/70">
        <div className="container">
          <div className="soft-card mx-auto max-w-lg p-8 text-center">
            <CheckCircle2 className="mx-auto text-[var(--teal)]" size={48} />
            <h2 className="mt-4 text-2xl font-extrabold text-[var(--navy)]">문의가 접수되었습니다</h2>
            <p className="mt-3 text-[var(--muted)]">확인 후 빠르게 연락드리겠습니다.</p>
            <button
              type="button"
              className="mt-6 text-sm font-semibold text-[var(--muted)] underline"
              onClick={() => {
                setDone(false);
                setForm(initial);
              }}
            >
              다시 작성하기
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section bg-white/70">
      <div className="container grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-bold tracking-wide text-[var(--teal)]">CONTACT</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            제휴·정보 문의
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            정식 등록 업체 제휴, 광고 게재, 정보 보완 요청은 아래 양식으로 남겨 주세요.
            {SITE.brand}는 중개 상담을 직접 진행하지 않으며, 확인된 업체 안내를 우선합니다.
          </p>
        </div>

        <form onSubmit={onSubmit} className="soft-card p-6 md:p-8">
          <div className="field">
            <label htmlFor="name">성함</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="홍길동"
            />
          </div>
          <div className="field">
            <label htmlFor="phone">연락처</label>
            <input
              id="phone"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="010-0000-0000"
            />
          </div>
          <div className="field">
            <label htmlFor="address">지역 (선택)</label>
            <input
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="예: 서울 / 수원"
            />
          </div>
          <div className="field">
            <label htmlFor="product">문의 유형</label>
            <select
              id="product"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            >
              {TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="memo">문의 내용</label>
            <textarea
              id="memo"
              rows={4}
              value={form.memo}
              onChange={(e) => setForm({ ...form, memo: e.target.value })}
              placeholder="관심 국가, 제휴 내용, 확인하고 싶은 절차 등을 적어 주세요."
            />
          </div>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            <Send size={18} />
            {submitting ? "접수 중…" : "문의 보내기"}
          </button>
        </form>
      </div>
    </section>
  );
}
