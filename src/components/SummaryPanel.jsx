function SummaryPanel({ total, breakdown }) {
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

      <div className="mb-6 overflow-hidden rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/10">
        <p className="text-sm text-slate-300">Total Expenses</p>
        <h3 className="mt-2 text-4xl font-black tracking-tight">${totalValue.toFixed(2)}</h3>
        <p className="mt-3 text-sm text-slate-400">Across {Object.keys(breakdown).length} tracked categories</p>
      </div>

      <div className="space-y-3">
        {Object.entries(breakdown).map(([category, value]) => {
          const percent = totalValue > 0 ? Math.round((value / totalValue) * 100) : 0;

          return (
            <div key={category} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                <span>{category}</span>
                <span>${value.toFixed(2)}</span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {percent}% of total
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SummaryPanel;