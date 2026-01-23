import React from "react";
import { useGetAgentWiseLeadQuery } from "../services/dashboardApi";

function safeText(v) {
  if (v === null || v === undefined) return "—";
  const s = String(v).trim();
  if (!s || s.toLowerCase() === "nan") return "—";
  return s;
}

function initials(first, last) {
  const f = safeText(first);
  const l = safeText(last);
  const a = f !== "—" ? f[0] : "";
  const b = l !== "—" ? l[0] : "";
  const out = (a + b).toUpperCase();
  return out || "??";
}

function formatDate(d) {
  if (!d) return "—";
  const s = String(d);
  const date = new Date(s.includes("T") ? s : `${s}T00:00:00`);
  if (Number.isNaN(date.getTime())) return safeText(d);
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AgentLeadsPanel() {
  const { data, isLoading, isError } = useGetAgentWiseLeadQuery(undefined, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true,
  });

  const leads = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-2 p-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-3 text-sm text-red-400">
        Failed to load leads
      </div>
    );
  }

  return (
    <div
    className="relative overflow-hidden rounded-2xl border border-white/10
               bg-gradient-to-b from-slate-900/70 to-slate-950/80
               shadow-[0_30px_120px_rgba(0,0,0,0.55)]
               max-h-[500px] overflow-y-auto"
  >
    {/* soft glow like ContactDetails */}
    <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(700px_circle_at_15%_0%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(700px_circle_at_90%_10%,rgba(168,85,247,0.14),transparent_55%)]" />

      {leads.map((lead) => {
        const fullName = [
          safeText(lead?.title) !== "—" ? safeText(lead?.title) : null,
          safeText(lead?.first_name) !== "—"
            ? safeText(lead?.first_name)
            : null,
          safeText(lead?.last_name) !== "—"
            ? safeText(lead?.last_name)
            : null,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={lead?.lead_id}
            className="flex items-center gap-3 px-3 py-2 hover:bg-white/10"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-white">
              {initials(lead?.first_name, lead?.last_name)}
            </div>

            {/* Main */}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-white">
                {fullName || "Unknown Lead"}
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                <span>{safeText(lead?.city)}</span>
                <span className="text-slate-600">•</span>
                <span>{safeText(lead?.country_code)}</span>
                <span className="text-slate-600">•</span>
                <span>ID: {safeText(lead?.lead_id)}</span>
              </div>
            </div>

            {/* Right meta */}
            <div className="shrink-0 text-right text-xs text-slate-400">
              <div>{formatDate(lead?.entry_date)}</div>
              <div className="text-slate-500">
                List {safeText(lead?.list_id)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
