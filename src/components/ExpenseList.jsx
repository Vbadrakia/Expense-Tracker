import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function ExpenseList({
  expenses,
  onDelete,
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Activity</p>
          <h2 className="text-xl font-bold text-slate-950">Recent Expenses</h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {expenses.length} item{expenses.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
            <p className="text-base font-semibold text-slate-900">No expenses yet</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add your first transaction to populate the summary and conversion panels.
            </p>
          </div>
        ) : (
          expenses.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.2) }}
              className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-slate-300 hover:bg-white"
            >
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-950">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.category}</p>
              </div>

              <div className="flex items-center gap-3">
                <p className="whitespace-nowrap text-lg font-bold text-slate-950">${Number(item.amount).toFixed(2)}</p>

                <button
                  onClick={() => onDelete(item.id)}
                  aria-label={`Delete ${item.name}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
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