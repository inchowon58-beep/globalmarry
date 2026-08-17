const TIPS = [
  {
    title: "등록번호를 직접 확인하세요",
    body: "상호명만 믿지 말고, 결혼중개업 등록번호와 대표자·소재지를 대조하세요.",
  },
  {
    title: "선입금 비율을 점검하세요",
    body: "계약 전 과도한 선입금, 현금만 요구하는 경우는 특히 주의가 필요합니다.",
  },
  {
    title: "계약서 없이 진행하지 마세요",
    body: "서비스 범위, 추가 비용, 환불·해지 조건이 문서로 남아 있어야 합니다.",
  },
  {
    title: "성공 보장을 의심하세요",
    body: "만남·성사를 단정하는 광고보다, 절차와 책임을 설명하는 업체가 안전합니다.",
  },
  {
    title: "현지 지사 여부를 물어보세요",
    body: "현지 서류·통역·동행 지원이 실제로 어떻게 이뤄지는지 확인하세요.",
  },
  {
    title: "가족·지인에게 공유하세요",
    body: "혼자 급하게 결정하기보다, 계약 내용을 한 번 더 검토하는 시간이 필요합니다.",
  },
];

export default function Prevention() {
  return (
    <section id="prevention" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-[var(--teal)]">SAFETY</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            계약 전 피해 예방 체크
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            국제결혼은 설렘보다 확인이 먼저입니다. 아래 항목을 통과한 뒤에 상담을 이어가세요.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((t) => (
            <article key={t.title} className="soft-card p-6">
              <h3 className="text-lg font-bold text-[var(--navy)]">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
