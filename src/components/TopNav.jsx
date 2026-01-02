import { useState } from "react";
import { format } from "date-fns";
import { BarChart, ChevronDown, Settings } from "lucide-react";

export default function TopNav() {
  const now = new Date();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-md">
      <div className="relative mx-auto max-w-[1440px] h-full px-6 flex items-center">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-primary flex items-center text-sm justify-center">
           
            cc
          </div>
          <BarChart className="w-5 h-5 text-green-500" />
          <h1 className="text-sm font-semibold tracking-tight">
            Outbound Dialer – Admin
          </h1>
        {/* </div> */}

        {/* CENTER (TRUE CENTER) */}
        {/* <div className="absolute left-1/4 -translate-x-1/2 hidden md:flex items-center gap-3"> */}
          <Dropdown label="All Campaigns" items={["All Campaigns", "Inbound", "Outbound"]} />
          <Dropdown label="Today" items={["Today", "Yesterday", "Last 7 Days"]} />
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-6">

          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-muted-foreground">
              System Healthy · Realtime
            </span>
          </div>

          <div className="text-right leading-tight">
            <div className="text-sm font-mono">
              {format(now, "hh:mm:ss a")}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {format(now, "EEEE, MMM d")}
            </div>
          </div>

          <button className="p-2 rounded-md hover:bg-slate-800/60 transition">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

      </div>
    </header>
  );
}

/* ---------- DROPDOWN ---------- */

function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-1 py-1 rounded-md
                   bg-slate border border-slate-700/100
                   text-sm text-foreground hover:bg-slate-700/60 transition"
      >
        <span className="text-xs">{label}</span>
        <ChevronDown className={`w-3 h-3 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-32 rounded-md
                        bg-slate-900 border border-slate-700/50 shadow-xl ">
          {items.map(item => (
            <button
              key={item}
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-2 text-xs text-foreground
                         hover:bg-slate-800/70 transition"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
