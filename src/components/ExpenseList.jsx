import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { formatAmount } from "../utils/currency";

function ExpenseList({
  expenses,
  onDelete,
  currency = "USD",
  rate = null,
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Expenses</h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">{expenses.length} item(s)</span>
      </div>

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
            <p className="text-base font-semibold text-slate-900">No expenses yet</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Add your first transaction to populate the summary and conversion panels.</p>
          </div>
        ) : (
          expenses.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.2) }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900 text-lg">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.category}</p>
              </div>

              <div className="flex items-center gap-3">
                <p className="whitespace-nowrap text-lg font-bold text-slate-900">{formatAmount(item.amount, currency, rate)}</p>

                <button onClick={() => onDelete(item.id)} aria-label={`Delete ${item.name}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600">
                  <Trash2 size={17} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;