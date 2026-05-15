import { useEffect, useMemo, useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";

const CATEGORIES = [
  "Food",
  "Travel",
  "Marketing",
  "Utilities",
  "Other",
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currency, setCurrency] = useState("EUR");

  const [rateState, setRateState] = useState({
    loading: false,
    error: "",
    rate: null,
  });

  const total = useMemo(() => {
    return expenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );
  }, [expenses]);

  const breakdown = useMemo(() => {
    return CATEGORIES.reduce((acc, category) => {
      acc[category] = expenses
        .filter((x) => x.category === category)
        .reduce((sum, item) => sum + Number(item.amount), 0);

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
        const res = await fetch(
          `https://open.er-api.com/v6/latest/USD`
        );

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
    setExpenses((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-6xl">

        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">
            Expense Tracker
          </h1>

          <p className="mt-2 text-slate-500">
            Manage expenses with live currency conversion
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="space-y-6">
            <ExpenseForm onAdd={addExpense} />

            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
            />
          </div>

          <div className="space-y-6">
            <SummaryPanel
              total={total}
              breakdown={breakdown}
            />

            <CurrencyConverter
              currency={currency}
              setCurrency={setCurrency}
              loading={rateState.loading}
              error={rateState.error}
              rate={rateState.rate}
              total={total}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;