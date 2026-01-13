import { ShieldCheck } from 'lucide-react';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { useMemo } from "react";
export function CampaignPerformance({ data }) {
  console.log({data});
  const rowData = data?.data || [];
  const StatusRenderer = (params) => {
    const status = params.value;
  
    const statusClasses = {
      READY: "bg-emerald-500/20 text-emerald-400",
      INCALL: "bg-blue-500/20 text-blue-400",
      PAUSED: "bg-amber-500/20 text-amber-400",
      OFFLINE: "bg-slate-500/20 text-slate-400",
    };
  
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
          statusClasses[status] || "bg-slate-600/20 text-slate-300"
        }`}
      >
        {status}
      </span>
    );
  };
  
  const columnDefs = useMemo(
    () => [
      {
        headerName: "CAMPAIGN ID",
        field: "campaign_id",
        minWidth: 120,
        maxWidth: 130,
        cellClass: "font-mono text-slate-300 uppercase",
      },
      {
        headerName: "TOTAL DIALS",
        field: "total_dials",
        minWidth: 110,
        maxWidth: 120,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "CONNECTED CALLS",
        field: "connected_calls",
        minWidth: 150,
        maxWidth: 160,
        cellRenderer: StatusRenderer,
      },
      {
        headerName: "CONNECTION RATE(%)",
        field: "connection_rate_pct",
        minWidth: 170,
        maxWidth: 190,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "TOTAL TALK TIME",
        field: "total_talk_time",
       
        minWidth: 150,
        maxWidth: 160,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "AVG TALK TIME",
        field: "avg_talk_time",
        minWidth: 140,
        maxWidth: 140,
        hide:true,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "DROP RATE(%)",
        field: "drop_rate_pct",
        minWidth: 140,
        maxWidth: 160,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "CONVERSIONS",
        field: "conversions",
        minWidth: 130,
        flex: 1, // ✅ let this stretch
        cellClass: "font-mono text-slate-300",
      }
    ],
    []
  );
  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      filter: false,
      resizable: false,
      suppressMovable: true,
    }),
    []
  );

  const agTheme = useMemo(
    () =>
      themeQuartz.withParams({
        backgroundColor: "transparent",
        headerBackgroundColor: "rgba(2,6,23,0.5)",
        headerTextColor: "#94a3b8",
        foregroundColor: "#cbd5f5",
        borderColor: "rgba(30,41,59,0.4)",
        rowHoverColor: "rgba(30,41,59,0.4)",
        oddRowBackgroundColor: "rgba(2,6,23,0.5)",
        headerHeight: 36,
        rowHeight: 34,
        wrapperBorderRadius: 0,
      }),
    []
  );
  return (
    <div className="p-2 border border-border rounded-lg bg-card/60">
      <div className="flex justify-between items-center m-2 lg:mb-4">
          <h3 className="text-xl leading-[1rem] font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
           Campaign Performance
          </h3>
          {/* <p className="text-xs text-slate-400 mt-1">Realtime agent status</p> */}
        {/* <button className="text-slate-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </button> */}
      </div>

      <div className="h-[150px] border border-border rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          theme={agTheme}
          suppressRowClickSelection
          suppressCellFocus
          domLayout="normal"
        />
      </div>
    </div>
  );
}
