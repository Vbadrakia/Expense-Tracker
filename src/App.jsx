import { useEffect, useMemo, useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";

const CATEGORIES = ["Food", "Travel", "Marketing", "Utilities", "Other"];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currency, setCurrency] = useState("EUR");
  const [rateState, setRateState] = useState({
    loading: false,
    error: "",
    rate: null,
  });

  const total = useMemo(() => {
    return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [expenses]);

  const breakdown = useMemo(() => {
    return CATEGORIES.reduce((acc, category) => {
      acc[category] = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + Number(expense.amount), 0);

      return acc;
    }, {});
  }, [expenses]);

  useEffect(() => {
    async function fetchRate() {
      setRateState({
        loading: true,
        error: "",
        rate: null,
      });

      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");

        if (!res.ok) {
          throw new Error("Failed to fetch rate");
        }

        const data = await res.json();

        if (data.result !== "success") {
          throw new Error("Failed to fetch rate");
        }

        setRateState({
          loading: false,
          error: "",
          rate: data.rates[currency],
        });
      } catch (err) {
        setRateState({
          loading: false,
          error: err.message,
          rate: null,
        });
      }
    }

    fetchRate();
  }, [currency]);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_34%),linear-gradient(180deg,_#eff6ff_0%,_#f8fafc_44%,_#eef2ff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Expense dashboard
              </span>

              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Expense Tracker
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  Track spending, compare categories, and convert totals with live FX rates in a clean dashboard.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[30rem] lg:flex-1">
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white shadow-lg shadow-slate-950/10">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total spent</p>
                <p className="mt-3 text-3xl font-black">${total.toFixed(2)}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Entries</p>
                <p className="mt-3 text-3xl font-black text-slate-950">{expenses.length}</p>
              </div>
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-700">Currencies</p>
                <p className="mt-3 text-3xl font-black text-blue-950">6+</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <ExpenseForm onAdd={addExpense} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </section>

          <section className="space-y-6">
            <SummaryPanel total={total} breakdown={breakdown} />

            <CurrencyConverter
              currency={currency}
              setCurrency={setCurrency}
              loading={rateState.loading}
              error={rateState.error}
              rate={rateState.rate}
              total={total}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;