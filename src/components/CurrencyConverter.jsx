import { AlertCircle, ArrowLeftRight, Loader2 } from "lucide-react";

const currencies = ["USD", "EUR", "GBP", "INR", "AUD", "CAD"];

function CurrencyConverter({ currency, setCurrency, loading, error, rate, total }) {
  const convertedTotal = rate ? (total * rate).toFixed(2) : "0.00";

  return (
    <div className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-5 flex items-center gap-2">
        <ArrowLeftRight size={20} className="text-slate-900" />
        <h2 className="text-xl font-bold text-slate-950">Live conversion</h2>
      </div>

      <label className="mb-1 block text-sm font-medium text-slate-700">Convert total to</label>
      <div className="flex items-center gap-3">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-300 focus:ring-0"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <div className="shrink-0 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
          Base currency: USD
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm font-medium">Refreshing exchange rate...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 text-rose-600">
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-sm font-semibold">Failed to fetch</p>
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