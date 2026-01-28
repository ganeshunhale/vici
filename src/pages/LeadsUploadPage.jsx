import { Upload, FileSpreadsheet, ListOrdered, Phone } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState ,useEffect, memo,useCallback} from "react";
import {
  useUploadExcelLeadsMutation,
  useGetLeadsQuery,
  useGetLogDataQuery,
  useDialNextMutation,
  useCallHangupMutation,
  useGetCampaignsQuery,
} from "../services/dashboardApi";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { useToast } from "../customHooks/useToast";
import DatePicker from "react-datepicker";
import CallDispositionPopup from "../components/CallDispositionPopup";

ModuleRegistry.registerModules([AllCommunityModule]);

const CallCellRenderer = memo((props) => {
  const number = props.data?.phone_number;
  const { activeNumber, handleRowCall } = props.context || {};

  const isActive = activeNumber === number;
  const isDisabled = !!activeNumber && !isActive;

  return (
    <button
      disabled={isDisabled}
      onClick={() => handleRowCall(number)}
      className={`px-2 py-1 rounded flex items-center gap-1 text-xs
        ${isActive ? "bg-red-600/20 text-red-400" : "bg-green-600/20 text-green-400"}
        ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"}
      `}
    >
      <Phone size={14} />
      {isActive ? "Disconnect" : "Call"}
    </button>
  );
});
export default function LeadsUploadPage() {
  const fileInputRef = useRef(null);
  const gridRef = useRef(null);

  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [activeNumber, setActiveNumber] = useState(null);
const [polling, setPolling] = useState(false);
const [showDispo, setShowDispo] = useState(false);
const [dialNext] = useDialNextMutation();
const [callHangup]= useCallHangupMutation()
const [selectedCampaign, setSelectedCampaign] = useState(null); 

const user = JSON.parse(localStorage.getItem("user"))?.user;

const { data: logData } = useGetLogDataQuery(user, {
  skip: !polling,
  pollingInterval: 5000,
});
const {data:campaingList,isLoading:campaingListLoading}= useGetCampaignsQuery();
  const { success, error ,info} = useToast();
   const today = new Date()
  
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      

  const [uploadExcel, { isLoading: uploading }] =
    useUploadExcelLeadsMutation();

  const { data, isFetching } = useGetLeadsQuery(
           {
              sd: startDate.toISOString().split("T")[0],
              ed: endDate.toISOString().split("T")[0],
              limit:pageSize
            }
          , // no params if both are today
        {
          pollingInterval: 30000,
          skipPollingIfUnfocused: true,
        });

  const rowData = data?.leads || [];
  const totalRows = data?.count || 0;

  const onUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("campaign_id", String(selectedCampaign.id));
    formData.append("campaign_name", selectedCampaign.name);
    try {
      const res = await uploadExcel(formData).unwrap();

      if (Array.isArray(res?.skipped_details) && res.skipped_details.length > 0) {
        res.skipped_details.forEach(({ phone, reason }) => {
          info(`${phone} - ${reason}`);
        });
      } else {
        success("Leads uploaded successfully!");
      }
      setFile(null);
      setSelectedCampaign(null);
      fileInputRef.current.value = null;
      // gridRef.current?.api.refreshServerSide();
    } catch (err) {
      error("Upload failed, please try again.");
    }
  };
  const StatusRenderer = (params) => {
    const status = params.value;
  
    const base =
      "px-2 py-1 rounded text-xs font-semibold whitespace-nowrap";
  
    const classes = {
      READY: "bg-emerald-500/25 text-emerald-300",
      INCALL: "bg-blue-500/20 text-blue-400",
      PAUSED: "bg-amber-500/20 text-amber-400",
      OFFLINE: "bg-slate-500/20 text-slate-400",
    };
  
    return (
      <span className={`${base} ${classes[status] || "bg-slate-600/20 text-slate-300"}`}>
        {status}
      </span>
    );
  };
  const handleRowCall = useCallback(async (number) => {
    if (activeNumber && activeNumber !== number) return;
  
    // DISCONNECT
    if (activeNumber === number) {
      console.log("disconnect by agent");
      try {
        await callHangup()
      } catch (error) {
        error("Failed to Disconnect Call")
      }
      
      success("Call Disconnected")
      setActiveNumber(null);
      
      return;
    }
  
    try {
      const res = await dialNext(number).unwrap();
  
      if (res?.vicidial_response?.toLowerCase().includes("error")) {
        // alert(res.vicidial_response);
        error(res.vicidial_response);
        return;
      }
      success("Call Connected")
      setActiveNumber(number);
      setPolling(true);
    } catch (err) {
      console.error("Call failed:", err);
      error("Call failed");
    }
  }, [activeNumber, dialNext, success, error])

  useEffect(() => {
    // console.log({inCallLeadsUploadPage})
    if (logData?.inCall) return;
    setPolling(false);
    setShowDispo(true);
    setActiveNumber(null);
  }, [logData]);
  

  
  const columnDefs = useMemo(
    () => [
      {
        headerName: "LEAD ID",
        field: "lead_id",
        minWidth: 100,
        maxWidth: 110,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "PHONE",
        field: "phone_number",
        minWidth: 150,
        cellClass: "font-mono text-slate-300",
        filter:true
      },
      {
        headerName: "USER",
        field: "user",
        minWidth: 140,
        valueFormatter: ({ value }) => value || "—",
      },
      {
        headerName: "FIRST NAME",
        field: "first_name",
        minWidth: 140,
        valueFormatter: ({ value }) => value || "—",
      },
      {
        headerName: "LAST NAME",
        field: "last_name",
        minWidth: 140,
        valueFormatter: ({ value }) => value || "—",
      },
      {
        headerName: "STATUS",
        field: "status",
        minWidth: 110,
        cellRenderer: StatusRenderer,
      },
      {
        headerName: "LIST ID",
        field: "list_id",
        minWidth: 90,
        maxWidth: 100,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "CAMPAIGN",
        field: "campaign_id",
        minWidth: 130,
        cellClass: "font-mono text-slate-300",
      },
      {
        headerName: "ENTRY DATE",
        field: "entry_date",
        minWidth: 130,
        valueFormatter: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "—",
      },
      // {
      //   headerName: "CALL",
      //   colId: "call",              // ✅ needed for refresh targeting
      //   minWidth: 120,
      //   maxWidth: 130,
      //   pinned: "right",
      //   lockPinned: true,
      //   suppressMovable: true,
      //   cellRenderer: CallCellRenderer,   // ✅ use component directly
      // },
    ],
    []
  );
  const gridContext = useMemo(
    () => ({
      activeNumber,
      handleRowCall,
    }),
    [activeNumber, handleRowCall]
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
      filter: true,
      suppressMovable: false,
      cellClass: "font-mono text-slate-300",
    }),
    []
  );
  useEffect(() => {
    if (!gridRef.current?.api) return;
  
    gridRef.current.api.refreshCells({
      columns: ["call"], // colId
      force: true,
    });
    gridRef.current.api.redrawRows();
  }, [activeNumber]);

  const onPaginationChanged = (event) => {
    const api = event.api;
    if (!api) return;
  
    const clickedPage = api.paginationGetCurrentPage() + 1; // 1-based
    const selectedPageSize = api.paginationGetPageSize();
  
    // Always trigger API on page size selection or page click
    setPageSize(selectedPageSize);
    setPage(clickedPage);
  };
  const agTheme = useMemo(
    () =>
      themeQuartz.withParams({
        backgroundColor: "rgba(2,6,23,0.45)",
        headerBackgroundColor: "rgba(2,6,23,0.6)",
        headerTextColor: "#94a3b8",
        foregroundColor: "#cbd5f5",
        borderColor: "rgba(30,41,59,0.4)",
        rowHoverColor: "rgba(30,41,59,0.4)",
        oddRowBackgroundColor: "rgba(2,6,23,0.45)",
        
        headerHeight: 36,
        rowHeight: 34,
      }),
    []
  );
  const rowClassRules = useMemo(
    () => ({
      "active-call-row": (params) =>
        params.data?.phone_number === activeNumber,
    }),
    [activeNumber]
  );

  return (
    <div className="p-4 space-y-6">
    
      {/* Upload Section */}
      <div className="border border-border rounded-xl bg-card/60 p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          Upload Leads (Excel)
        </h3>

        <div className="flex flex-wrap items-center justify-end gap-4 ">
          <div className="flex flex-wrap items-center gap-4" >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm border border-slate-700"
          >
            Choose File
          </button>

          <span className="text-sm text-slate-400">
            {file ? file.name : "No file selected"}
          </span>
          </div>

          <select
            disabled={campaingListLoading || campaingList.data.length === 0}
            value={selectedCampaign?.id ?? ""}
            onChange={(e) => {
              const id = e.target.value;
              const c = campaingList?.data?.find((x) => x.campaign_id === id);
              setSelectedCampaign(c ? { id: c.campaign_id, name: c.campaign_name } : null);
            }}
            className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-sm disabled:opacity-50"
          >
            <option value="" disabled>
              {campaingListLoading ? "Loading campaigns..." : "Select Campaign"}
            </option>

            {campaingList?.data?.map((c) => (
              <option key={c.campaign_id} value={c.campaign_id}>
                {c.campaign_name}
              </option>
            ))}
          </select>
        {/* </div> */}

          <button
            onClick={onUpload}
            disabled={!file || !selectedCampaign || uploading}
            className=" px-5 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border border-border rounded-xl bg-card/60 p-4">
      {/* <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <ListOrdered className="w-4 h-4 text-emerald-400" />
          Leads 
        </h3> */}
        <div className="flex justify-between mb-2">
            <h3 className="text-xl flex items-center gap-2 font-semibold text-white"><ListOrdered className="w-4 h-4 text-emerald-400" />
            Leads </h3>
            <div className="flex items-center gap-2 ">
                <span className="text-sm text-slate-400">From:</span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={endDate||today} // cannot select future dates
                  className="bg-input border border-border text-foreground text-sm rounded px-2 py-1 w-24"
                  popperClassName="z-50 dark-datepicker"
                />
        
                <span className="text-sm text-slate-400">To:</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  popperPlacement="bottom-start"
                  
                  maxDate={today} // cannot select future dates
                  popperClassName="z-50 dark-datepicker"
                  className="bg-input border border-border text-foreground text-sm rounded px-2 py-1 w-24"
                />
              </div>
          </div>
        <div className="h-[480px]">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            theme={agTheme}
            pagination
            paginationPageSize={pageSize}
            paginationPageSizeSelector={[10, 25, 50, 100,200]}
            rowCount={totalRows}
            rowClassRules={rowClassRules} 
            getRowId={(p) => p.data.phone_number}
            context={gridContext}  
            suppressRowClickSelection
            suppressCellFocus
            loading={isFetching}
            onPaginationChanged={onPaginationChanged}
            
          />
        </div>
      </div>
      {/* {showDispo && (
  <CallDispositionPopup closeDispo={()=>setShowDispo(false)} />
)} */}
    </div>
  );
}


