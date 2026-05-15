import { useEffect, useMemo, useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";
import Sidebar from "./components/Sidebar";

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
    <div className="min-h-screen px-0 text-slate-900 sm:px-0 lg:px-0">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[18rem_1fr]">
        <Sidebar />

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Expense Tracker</h1>
                <p className="text-sm text-slate-500">Track spending, compare categories, convert totals.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700 sm:block">Signed in as <strong>Vedant</strong></div>
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold">{rateState.rate ? `${(total * rateState.rate).toFixed(2)} ${currency}` : `$${total.toFixed(2)}`}</div>
              </div>
            </header>

            <main className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="space-y-6">
                <ExpenseForm onAdd={addExpense} />
                <ExpenseList expenses={expenses} onDelete={deleteExpense} currency={currency} rate={rateState.rate} />
              </section>

              <section className="space-y-6">
                <SummaryPanel total={total} breakdown={breakdown} currency={currency} rate={rateState.rate} />

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
      </div>
    </div>
  );
}

export default App;