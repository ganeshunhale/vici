import { ShieldCheck } from 'lucide-react';

export function PerformanceTable({ data }) {
  return (
    <div className="border border-slate-800 rounded-lg bg-slate-900/30 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h3 className="text-xl leading-[1rem] font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Agent Performance Summary
          </h3>
          <p className="text-xs text-slate-400 mt-1">Realtime agent status</p>
        {/* <button className="text-slate-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </button> */}
      </div>

      <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-950/50 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">STATION</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Agent (ID)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">STATUS</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Calls Handled</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">TALK TIME HH:MM:SS</th>
              {/* <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Hold</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20">
                <td className="px-4 py-3 text-sm text-slate-300 font-mono">{row.station}</td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                      {row.agent.charAt(0)}
                    </div>
                    {row.agent}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status.includes('READY') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {row.status.split(' ')[0]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-300 text-center font-mono">{row.callsHandled}</td>
                <td className="px-4 py-3 text-sm text-slate-300 text-center font-mono">{row.talkTime}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
