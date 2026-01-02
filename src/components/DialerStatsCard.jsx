export function DialerStats({ allData }) {
    const {
      dialer_level = '--',
      dial_method = '--',
      calls_today = 0,
      avg_agent = 0,
      dialable_leads = 0,
      trunk_short_fill = {},
      diff_percent = 0,
      order = 'UP',
      hopper_min_max=0
    } = allData || {};
    return (
      <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl leading-[1rem] font-semibold text-white">
            Dialer Overview
          </h3>
          <span className="text-xs text-slate-400">Realtime</span>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          {/* Dialer Level */}
          <StatCard label="Dialer Level" value={dialer_level} />
  
          {/* Dial Method */}
          <StatCard label="Dial Method" value={dial_method} />
  
          {/* Calls Today */}
          <StatCard label="Calls Today" value={calls_today} />
  
          {/* Avg Agents */}
          <StatCard label="hooper" value={hopper_min_max} />
  
          {/* Dialable Leads */}
          <StatCard label="Dialable Leads" value={dialable_leads} />
  
          {/* Trunk Fill */}
          {/* <StatCard
            label="Trunk Fill"
            value={`${trunk_short_fill.trunk_fill ?? 0}%`}
          /> */}
  
          {/* Trunk Short */}
          {/* <StatCard
            label="Trunk Short"
            value={trunk_short_fill.trunk_short ?? 0}
          /> */}
            <StatCard
            label="order"
            value={order}
          />
          {/* Performance */}
          {/* <div className="bg-slate-900/50 rounded p-4 border border-slate-700/50">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Order
            </p>
            <p
              className={`text-sm font-semibold ${
                order === 'UP'
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }`}
            >
              {order}
            </p>
          </div> */}
        </div>
      </div>
    );
  }
  function StatCard({ label, value }) {
    return (
      <div className="bg-slate-900/50 rounded p-4 border border-slate-700/50">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-emerald-400">
          {value}
        </p>
      </div>
    );
  }
  