function SummaryPanel({
  total,
  breakdown,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Summary
      </h2>

      <div className="mb-6 rounded-2xl bg-slate-900 p-5 text-white">

        <p className="text-sm text-slate-300">
          Total Expenses
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          ${total.toFixed(2)}
        </h3>

      </div>

      <div className="space-y-3">

        {Object.entries(breakdown).map(
          ([category, value]) => (
            <div
              key={category}
              className="flex items-center justify-between rounded-2xl border p-4"
            >
              <span>{category}</span>

              <span>
                ${value.toFixed(2)}
              </span>
            </div>
          )
        )}

      </div>
    </div>
  );
}

export default SummaryPanel;