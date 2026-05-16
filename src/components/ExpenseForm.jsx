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
    <div className="rounded-[1.25rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-2">
        <Plus size={20} className="text-slate-900" />
        <h2 className="text-xl font-bold text-slate-900">Add expense</h2>
      </div>

      <form onSubmit={submit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Expense name
          <input
            type="text"
            placeholder="Lunch, ads, taxi..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-0"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Amount (USD)
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-0"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-slate-300 focus:ring-0"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button className="mt-3 w-full rounded-2xl bg-slate-900 px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-slate-800">
          <div className="flex items-center justify-center gap-3">
            <Plus size={18} />
            <span>Add expense</span>
          </div>
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;