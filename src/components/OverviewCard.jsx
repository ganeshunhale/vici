export function OverviewCard({
  label,
  value,
  icon: Icon,
  trend,
  trendDesc,
  color,
}) {
  const colorClasses = {
    blue: "border-blue-500/30 bg-blue-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
    slate: "border-slate-600/30 bg-slate-500/5",
  };

  const iconColorClasses = {
    blue: "text-blue-400",
    amber: "text-amber-400",
    slate: "text-slate-400",
  };

  return (
    <div className={`border rounded-lg h-24 flex-1 flex flex-col ${colorClasses[color]}`}>
      {/* <div className="flex-1 h-full flex flex-col">   */}
        {/* ICON — SEPARATE COLUMN */}
        {/* <div className="w-1/4 flex items-center justify-center p-4">
          <Icon className={`w-10 h-10 ${iconColorClasses[color]}`} />
        </div> */}

        {/* DATA COLUMN */}
        {/* <div className=" flex flex-col"> */}
          {/* DATA CONTENT */}
          <div className="p-1">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              {label}
            </p>

            <div className="text-xl font-bold font-mono text-white mt-1">
              {value}
            </div>
          </div>

          {/* TREND — ONLY UNDER DATA */}
          {/* {trend && (
  <div className="border-t border-slate-700/60 bg-slate-800/40 px-4 py-2">
    <p className="text-xs text-slate-400">
      <span className="text-slate-300 font-medium">+ {trend}</span>{" "}
      {trendDesc}
    </p>
  </div>
)} */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}
