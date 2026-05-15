import { Home, PlusCircle, BarChart2, Settings } from "lucide-react";

function NavButton({ children, active }) {
  return (
    <button className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
      {children}
    </button>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col gap-4 px-4 py-6 lg:flex">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
          ET
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-950">Expense Tracker</h3>
          <p className="text-xs text-slate-500">Personal finance app</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <NavButton active>
          <Home size={16} />
          Dashboard
        </NavButton>

        <NavButton>
          <PlusCircle size={16} />
          New Entry
        </NavButton>

        <NavButton>
          <BarChart2 size={16} />
          Reports
        </NavButton>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <NavButton>
            <Settings size={16} />
            Settings
          </NavButton>
        </div>
      </nav>
    </aside>
  );
}
