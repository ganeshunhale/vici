import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { BarChart, ChevronRight, Loader2, LogOut, Menu, User, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectIsAdmin, selectRoleLabel, selectUser, selectUserName } from "../slices/authSlice";
import { resetAutoDialTime, setCurrentLead } from "../slices/dialSlice";
import { useDialNextMutation } from "../services/dashboardApi";
import { CALL_STATE, selectCallState, selectIsCallBusy, setCallState } from "../slices/callSlice";
import dayjs from "dayjs"

const adminNavItems = [
  { name: "Dashboard", path: "/" },
  { name: "Selective", path: "/selective" },
  { name: "Leads Upload", path: "/leads-upload" },
];

const agentNavItems = [{ name: "Call", path: "/call" }];

export default function TopNav() {
  const [now, setNow] = useState(new Date());
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const roleLabel = useSelector(selectRoleLabel);
  const userName = useSelector(selectUserName);

  const isCallBusy = useSelector(selectIsCallBusy);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = useMemo(
    () => (isAdmin ? adminNavItems : agentNavItems),
    [isAdmin]
  );
  const [dialNext, { isLoading: isDialing }] = useDialNextMutation();
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  // optional: close mobile menu when role changes
  useEffect(() => {
    setMobileOpen(false);
  }, [isAdmin]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login", { replace: true });
  };
  const handleDialNext = async () => {
    try {
      // if your API needs agent/user info, pass it here:
      // await dialNext({ userId: user.id }).unwrap();
      dispatch(setCallState(CALL_STATE.DIALING));

      let res = await dialNext({}).unwrap();

      if (res?.vicidial_response?.toLowerCase?.().includes("error")) {
        alert(res.vicidial_response);
        dispatch(setCallState(CALL_STATE.IDLE));
        return;
      }
      dispatch(setCurrentLead(res?.details ?? null));
      dispatch(setCallState(CALL_STATE.INCALL));
      // ✅ go to /call page so agent sees Contact Details & Leads
      navigate("/call");
    } catch (e) {
      dispatch(setCallState(CALL_STATE.IDLE));
      alert("Failed to dial next. Please try again.");
    }
  };

  const { isPaused, autoDialTime } = useSelector((e) => e.dial);
  const [nextDialIn, setNextDialIn] = useState(60);
  
  const dialLockRef = useRef(false);
  
  useEffect(() => {
    if(isAdmin) return
    dialLockRef.current = false; // reset lock whenever a new autodia ltime is set
  
    const timer = setInterval(() => {
      if (isPaused || isCallBusy) return;
  
      const timeRemaining = dayjs(autoDialTime).diff(dayjs(), "seconds");
      setNextDialIn(Math.max(0, timeRemaining));
  
      if (timeRemaining <= 0 && !dialLockRef.current) {
        dialLockRef.current = true;   // ✅ prevents repeated calls
        handleDialNext();             // fire once
      }
    }, 1000);
  
    return () => clearInterval(timer);
  }, [autoDialTime, isPaused, isCallBusy, handleDialNext, isAdmin]);

  useEffect(() => {
    if(isAdmin) return
    if (!isCallBusy && !isPaused) {
      dispatch(resetAutoDialTime());
    }
  }, [isCallBusy, isPaused, dispatch, isAdmin]);

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
            Outbound Dialer – {isAdmin ? "Admin" : "Agent"}
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
        <div className="ml-auto flex items-center gap-4">
        {user && (
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-md bg-slate-800/60 border border-slate-700">
              <User className="w-4 h-4 text-muted-foreground" />
              <div className="leading-tight">
                <div className="text-sm font-medium">{userName}</div>
                <div className="text-[11px] text-muted-foreground">
                  {roleLabel}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-1.5 rounded-md hover:bg-slate-700 text-muted-foreground hover:text-red-400 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="hidden md:block text-right leading-tight mr-3">
            <div className="text-sm font-mono">{format(now, "hh:mm:ss a")}</div>
            <div className="text-[11px] text-muted-foreground">
              {format(now, "EEEE, MMM d")}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-md hover:bg-slate-800/60"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {!!user && !isAdmin && (
            <button
              // onClick={handleDialNext}
              // disabled={isDialing|| isCallBusy}
              disabled={true}
              className="hidden md:flex items-center gap-3 px-5 py-2 rounded-xl border border-cyan-400/20
                         bg-gradient-to-r from-cyan-900/50 via-sky-900/40 to-indigo-900/40
                         hover:from-cyan-900/70 hover:via-sky-900/60 hover:to-indigo-900/60
                         shadow-[0_0_30px_rgba(34,211,238,0.15)] transition"
              title="Dial Next"
            >
              <div className="flex items-center gap-2">
                {isDialing ? (
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-cyan-200" />
                )}
                <span className="tracking-widest text-xs font-semibold text-cyan-100">
                  DIAL NEXT in {nextDialIn}
                </span>
              </div>

              {/* tiny “bars” like your screenshot */}
              <div className="flex items-end gap-1 opacity-80">
                {[6, 10, 7, 14, 9, 12].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-sm bg-cyan-300/60"
                    style={{ height: h }}
                  />
                ))}
              </div>
            </button>
          )}
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-4 space-y-3">
          {user && (
            <div className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/60 border border-slate-700">
              <div>
                <div className="text-sm font-medium">{userName}</div>
                <div className="text-[11px] text-muted-foreground">
                  {roleLabel}
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="p-2 rounded-md hover:bg-slate-700 text-muted-foreground hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
           {!!user && !isAdmin && (
            <button
              onClick={async () => {
                setMobileOpen(false);
                // await handleDialNext();
              }}
              disabled={isDialing}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-cyan-400/20
                         bg-gradient-to-r from-cyan-900/50 via-sky-900/40 to-indigo-900/40"
            >
              <span className="tracking-widest text-xs font-semibold text-cyan-100">
                {isDialing ? "DIALING..." : "DIAL NEXT"}
              </span>
              {isDialing ? (
                <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
              ) : (
                <ChevronRight className="w-5 h-5 text-cyan-200" />
              )}
            </button>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-sm ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
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
