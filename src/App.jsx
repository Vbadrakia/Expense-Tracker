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
            <header className="overflow-hidden rounded-[1.25rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 21v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>

                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Expense Tracker</h1>
                    <p className="mt-1 text-sm text-slate-500">Track expenses, category totals, and live currency conversion.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-[0.75rem] bg-slate-50 px-3 py-2 text-xs uppercase tracking-widest text-slate-500">Running total</div>
                  <div className="rounded-[1rem] bg-slate-900 px-5 py-3 text-right text-white shadow-lg">
                    <div className="text-xs tracking-widest text-slate-300">$ {(/* label placeholder */'')}</div>
                    <div className="mt-1 text-2xl font-extrabold">{rateState.rate ? `${(total * rateState.rate).toFixed(2)} ${currency}` : `$${total.toFixed(2)}`}</div>
                  </div>
                </div>
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