const STEPS = [
  {
    n: "1",
    title: "정보 확인",
    desc: "국가별 절차, 필요 서류, 예상 기간과 비용을 먼저 파악합니다.",
  },
  {
    n: "2",
    title: "업체 비교",
    desc: "정부 정식 등록 여부, 전문 국가, 현지 지사, 계약 조건을 비교합니다.",
  },
  {
    n: "3",
    title: "상담·계약",
    desc: "등록번호와 계약서를 확인하고, 선입금·환불 규정을 반드시 점검합니다.",
  },
  {
    n: "4",
    title: "혼인·비자",
    desc: "현지 혼인, 국내 신고, 사증 신청 순서를 단계별로 진행합니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section bg-white/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-[var(--teal)]">PROCESS</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
            국제결혼, 이렇게 준비하세요
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            급하게 계약하기보다, 확인할 항목을 먼저 정리하는 것이 안전한 출발입니다.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="soft-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sky-soft)] text-lg font-extrabold text-[var(--teal)]">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--navy)]">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
