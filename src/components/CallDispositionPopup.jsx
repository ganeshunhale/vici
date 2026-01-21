import React, { useState } from 'react'
import { useSubmitStatusMutation } from '../services/dashboardApi';
const DISPOSITIONS = [
  { label: "Busy", value: "B" },
  { label: "Completed", value: "C" },
  { label: "No Answer", value: "N" },
  { label: "Not Interested", value: "NI" },
  { label: "Callback", value: "CBR" },
  { label: "Converted", value: "CON" },
  { label: "Disconnected", value: "D" },
  { label: "Interested", value: "IN" },
  { label: "Invalid Number", value: "INVN" },
  { label: "Wrong Number", value: "WN" },
];
const CallDispositionPopup = ({setShowDispo}) => {
const [submitStatus, { isLoading: submitting }] = useSubmitStatusMutation();
const [selectedStatus, setSelectedStatus] = useState(null);
    const handleSubmitStatus = async () => {
        if (!selectedStatus) return;
      
        try {
       
          await submitStatus(selectedStatus.value).unwrap();
          setShowDispo(false);
          setSelectedStatus(null);
          
        } catch (err) {
          console.error(err);
        }
      };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-[hsl(229_56%_13%)] p-6 rounded-xl w-[520px] border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Call Disposition</h3>

      <div className="grid grid-cols-3 gap-3 text-sm">
      {DISPOSITIONS.map((d) => (
    <button
      key={d.value}
      onClick={() => setSelectedStatus(d)}
      className={`p-2 rounded border text-left ${
        selectedStatus?.value === d.value
          ? "bg-indigo-600 border-indigo-500"
          : "bg-slate-900 border-white/10 hover:bg-indigo-600/20"
      }`}
    >
      <span className="font-medium">{d.label}</span>
      <span className="block text-xs text-slate-400 mt-1">
        {d.value}
      </span>
    </button>
  ))}
      </div>

      <button
        onClick={handleSubmitStatus}
        disabled={!selectedStatus || submitting}
        className="mt-5 w-full py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Submit Status"}
      </button>
    </div>
  </div>
  )
}

export default CallDispositionPopup