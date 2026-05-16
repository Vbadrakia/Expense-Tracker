import { formatAmount } from "../utils/currency";

function SummaryPanel({ total, breakdown, currency = "USD", rate = null }) {
  const totalValue = total || 0;
  const categoriesUsed = Object.values(breakdown).filter((value) => value > 0).length;

  return (
    <div className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="mb-6 text-xl font-bold text-slate-950">Summary</h2>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Total</p>
          <h3 className="mt-2 text-3xl font-extrabold">{rate ? `${(totalValue * rate).toFixed(2)} ${currency}` : `$${totalValue.toFixed(2)}`}</h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Categories Used</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{categoriesUsed}</h3>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(breakdown)
          .filter(([, value]) => value > 0)
          .map(([category, value]) => (
            <div key={category} className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                <span className="text-base text-slate-900">{category}</span>
                <span className="font-semibold text-slate-900">{formatAmount(value, currency, rate)}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SummaryPanel;