import {
  Loader2,
  AlertCircle,
} from "lucide-react";

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AUD",
  "CAD",
];

function CurrencyConverter({
  currency,
  setCurrency,
  loading,
  error,
  rate,
  total,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Currency Converter
      </h2>

      <select
        value={currency}
        onChange={(e) =>
          setCurrency(e.target.value)
        }
        className="mb-5 w-full rounded-2xl border p-3 outline-none"
      >
        {currencies.map((cur) => (
          <option
            key={cur}
            value={cur}
          >
            {cur}
          </option>
        ))}
      </select>

      <div className="rounded-2xl border p-5">

        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle />
            <span>{error}</span>
          </div>
        ) : (
          <>
            <p className="text-slate-500">
              1 USD = {rate?.toFixed(2)} {currency}
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              {(total * rate).toFixed(2)} {currency}
            </h3>
          </>
        )}

      </div>
    </div>
  );
}

export default CurrencyConverter;