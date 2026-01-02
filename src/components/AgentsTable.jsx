import { Users} from 'lucide-react';

export function AgentsTable({ data }) {
  return (
    <div className="border border-slate-800 rounded-lg bg-slate-900/30 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-slate-800">
        <h3 className="text-xl leading-[1rem] font-semibold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400" />
          Agents on Calls
        </h3>
        {/* <button className="text-slate-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </button> */}
      </div>

      <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
        <table className="w-full text-sm ">
          <thead className="bg-slate-950/50 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">agent id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">agent name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">campaign id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">calls_handled</th>

            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20">
                <td className="px-4 py-3 text-sm text-slate-300 font-mono">{row.agent_id}</td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                      {row.agent_name.charAt(0)}
                    </div>
                    {row.agent_name}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-300 font-mono">{row.campaign_id}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'READY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-300 font-mono">{row.calls_handled}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
