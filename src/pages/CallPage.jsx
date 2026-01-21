import { useEffect, useMemo, useState } from "react";
import { Phone, Search, Loader2 } from "lucide-react";
import { useCallHangupMutation, useCallNumberMutation, useGetLeadsQuery, useGetLogDataQuery, useSubmitStatusMutation, } from "../services/dashboardApi";
import CallDispositionPopup from "../components/CallDispositionPopup";


export default function CallPage() {
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());
  const [pageSize] = useState(50);
  const user = JSON.parse(localStorage.getItem("user"))?.user;

const [polling, setPolling] = useState(false);
const [showDispo, setShowDispo] = useState(false);


  const [search, setSearch] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [open, setOpen] = useState(false);
  const { data: logData } = useGetLogDataQuery(user, {
    skip: !polling,
    pollingInterval: 5000,
  });
  const { data, isFetching } = useGetLeadsQuery(
    {
      sd: startDate.toISOString().split("T")[0],
      ed: endDate.toISOString().split("T")[0],
      limit: pageSize,
    },
    {
      pollingInterval: 30000,skip:polling,
      skipPollingIfUnfocused: true,
    }
  );

  const [callNumber, { isLoading:isCalling }] = useCallNumberMutation();
  const [callHangup]= useCallHangupMutation()
  const numbers = useMemo(() => {
    return data?.leads?.map((l) => l.phone_number).filter(Boolean) || [];
  }, [data]);

  const filtered = useMemo(() => {
    if (!search) return numbers;
    return numbers.filter((n) => n.includes(search));
  }, [search, numbers]);

  const handleCall = async () => {
    if (!selectedNumber) return;
    if (polling) {
      console.log("disconnect by agent");
      try {
        await callHangup()
        console.success("Call Disconnected")
      setSelectedNumber(null);
      return;
      } catch (error) {
        console.error("Failed to Disconnect Call")
      }
      
    }
    try {
      const res = await callNumber(selectedNumber).unwrap();
  
      console.log("Call API Response:", res);
  
      // ✅ check vicidial response
      if (res?.vicidial_response?.toLowerCase().includes("error")) {
        alert(res.vicidial_response); // or toast
        return;
      }
  
      // ✅ only start polling if call really started
      setPolling(true);
    } catch (err) {
      console.error("Call failed:", err);
    }
  };

  useEffect(() => {
    if (!logData?.leads?.length) return;
  
    const lead = logData.leads[0];
  
    if (lead.uniqueid) {
      setPolling(false);
      setShowDispo(true);
    }
  }, [logData]);

  
  return (
    <div className="p-6 min-h-screen bg-[hsl(231_58%_6%)] text-white">
      <div className="max-w-xl mx-auto mt-20 bg-[hsl(229_56%_13%)] p-6 rounded-2xl border border-white/10 shadow-xl">

        <h2 className="text-xl font-semibold mb-4">Call Panel</h2>

        {/* Dropdown */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-2 rounded-lg cursor-pointer"
          >
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedNumber(e.target.value);
                setOpen(true);
              }}
              placeholder="Search or type number..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          {open && (
            <div className="absolute z-50 mt-1 w-full max-h-52 overflow-auto bg-slate-950 border border-white/10 rounded-lg">
              {isFetching && (
                <p className="p-3 text-sm text-slate-400">Loading...</p>
              )}

              {!isFetching &&
                filtered.map((num, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedNumber(num);
                      setSearch(num);
                      setOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-indigo-600/20 cursor-pointer text-sm"
                  >
                    {num}
                  </div>
                ))}

              {!isFetching && filtered.length === 0 && (
                <p className="p-3 text-sm text-slate-500">
                  Use typed number
                </p>
              )}
            </div>
          )}
        </div>

        {/* Selected */}
        <p className="mt-3 text-sm text-slate-400">
          Selected: <span className="text-white">{selectedNumber || "-"}</span>
        </p>

        {/* Call Button */}
        <button
          onClick={handleCall}
          disabled={!selectedNumber }
          className={`mt-5 w-full py-2 rounded-lg ${polling?"bg-red-600/20 text-red-400 hover:bg-red-700": "bg-green-600/20 text-green-400 hover:bg-green-700"}  flex items-center justify-center gap-2 disabled:opacity-50`}
        >
          {isCalling ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Phone size={18} />
          )}
          {polling?"Disconnect":"Call"}
        </button>

        {showDispo && (
 <CallDispositionPopup setShowDispo={setShowDispo}/>
)}
      </div>
    </div>
  );
}
