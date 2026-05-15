import { AlertCircle, Loader2, Coins } from "lucide-react";

const currencies = ["USD", "EUR", "GBP", "INR", "AUD", "CAD"];

function CurrencyConverter({ currency, setCurrency, loading, error, rate, total }) {
  const convertedTotal = rate ? (total * rate).toFixed(2) : "0.00";

  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
          <Coins size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">FX view</p>
          <h2 className="text-xl font-bold text-slate-950">Currency Converter</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="col-span-2 grid gap-2 text-sm font-medium text-slate-700">
          Convert total to
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none">
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </label>

        <div className="col-span-1 flex items-center justify-end">
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">Base currency: USD</div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm font-medium">Refreshing exchange rate...</span>
          </div>
        ) : error ? (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Failed to fetch</p>
              <p className="mt-1 text-sm leading-6">{error}</p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-slate-500">1 USD = {rate?.toFixed(2)} {currency}</p>
            <h3 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              {convertedTotal} {currency}
            </h3>
            <p className="mt-2 text-sm text-slate-500">Converted from your current total of ${total.toFixed(2)} USD.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;