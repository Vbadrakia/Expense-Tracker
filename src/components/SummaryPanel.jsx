import { formatAmount } from "../utils/currency";

function SummaryPanel({ total, breakdown, currency = "USD", rate = null }) {
  const totalValue = total || 0;

  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Analytics</p>
          <h2 className="text-xl font-bold text-slate-950">Summary</h2>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
          Live
        </span>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Total</p>
          <h3 className="mt-2 text-3xl font-extrabold">{rate ? `${(totalValue * rate).toFixed(2)} ${currency}` : `$${totalValue.toFixed(2)}`}</h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Categories Used</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{Object.keys(breakdown).length}</h3>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(breakdown).map(([category, value]) => {
          const percent = totalValue > 0 ? Math.round((value / totalValue) * 100) : 0;

          return (
            <div key={category} className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                <span className="text-base text-slate-900">{category}</span>
                <span className="font-semibold text-slate-900">{formatAmount(value, currency, rate)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SummaryPanel;