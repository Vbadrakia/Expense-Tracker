import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function ExpenseList({
  expenses,
  onDelete,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Expenses
        </h2>

        <span className="text-sm text-slate-500">
          {expenses.length} items
        </span>
      </div>

      <div className="space-y-3">

        {expenses.length === 0 ? (
          <p className="text-slate-500">
            No expenses added
          </p>
        ) : (
          expenses.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between rounded-2xl border p-4"
            >
              <div>
                <h3 className="font-medium">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.category}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <p className="font-semibold">
                  ${item.amount}
                </p>

                <button
                  onClick={() =>
                    onDelete(item.id)
                  }
                  className="rounded-full border p-2"
                >
                  <Trash2 size={18} />
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