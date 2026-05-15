import { useState } from "react";
import { Plus } from "lucide-react";

const categories = [
  "Food",
  "Travel",
  "Marketing",
  "Utilities",
  "Other",
];

function ExpenseForm({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const submit = (e) => {
    e.preventDefault();

    if (!name || !amount) return;

    onAdd({
      id: crypto.randomUUID(),
      name,
      amount: Number(amount),
      category,
    });

    setName("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
          <Plus size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Quick entry</p>
          <h2 className="text-xl font-bold text-slate-950">Add Expense</h2>
        </div>
      </div>

      <form onSubmit={submit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Expense name
          <input
            type="text"
            placeholder="Dinner, cab, ad spend..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Amount
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
          <Plus size={18} />
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;