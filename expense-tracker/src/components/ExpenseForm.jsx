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
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-4 flex items-center gap-2">
        <Plus size={20} />
        <h2 className="text-xl font-semibold">
          Add Expense
        </h2>
      </div>

      <form
        onSubmit={submit}
        className="grid gap-4"
      >

        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="rounded-2xl border p-3 outline-none"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="rounded-2xl border p-3 outline-none"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="rounded-2xl border p-3 outline-none"
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <button
          className="rounded-2xl bg-slate-900 p-3 text-white"
        >
          Add Expense
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;