import { useEffect, useState } from "react";
import { format } from "date-fns";
import { BarChart, ChevronDown, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Selective", path: "/selective" },
  { name: "Leads Upload", path: "/leads-upload" },
  { name: "Call", path: "/call" },
];

export default function TopNav() {
  const [now, setNow] = useState(new Date());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-md">
      <div className="relative mx-auto max-w-[1440px] h-full px-6 flex items-center">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-primary flex items-center text-sm justify-center">
            cc
          </div>
          <BarChart className="w-5 h-5 text-green-500" />
          <h1 className="text-base font-semibold tracking-tight">
            Outbound Dialer – Admin
          </h1>
        </div>

        {/* CENTER NAV (DESKTOP) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-6">

          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-muted-foreground">
              System Healthy · Realtime
            </span>
          </div>

          <div className="hidden md:block text-right leading-tight">
            <div className="text-sm font-mono">
              {format(now, "hh:mm:ss a")}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {format(now, "EEEE, MMM d")}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-800/60"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-sm ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
