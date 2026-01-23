import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactDetails from "../components/ContactDetails";
import CallDispositionPopup from "../components/CallDispositionPopup";

import { useGetLogDataQuery, usePingQuery } from "../services/dashboardApi";
import { closeDispo, openDispo, CALL_STATE, selectCallState, selectShowDispo, } from "../slices/callSlice";
import { selectUser } from "../slices/authSlice";
import { clearCurrentLead } from "../slices/dialSlice";
import AgentLeadsPanel from "../components/AgentLeadsPanel";
import TotalDialsToday from "../components/TotalDialsToday";

export default function CallPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { isPaused } = useSelector(e => e.dial)

  
  usePingQuery(undefined, {
    pollingInterval:  5000,
    skipPollingIfUnfocused: true,
    skip: isPaused
  });

  const callState = useSelector(selectCallState);
  const showDispo = useSelector(selectShowDispo);

  const shouldPollLog =
    callState === CALL_STATE.INCALL || callState === CALL_STATE.ENDING;
  console.log({ shouldPollLog })
  const { data: logData } = useGetLogDataQuery(user.user, {
    skip: !user,
    pollingInterval: shouldPollLog ? 2000 : 0,
    refetchOnMountOrArgChange: true,
  });

  // ✅ uniqueid => open dispo + stop polling
  useEffect(() => {
    if (!logData?.leads?.length) return;
    const lead = logData.leads[0];
    if (lead?.uniqueid) {
      dispatch(openDispo()); // sets DISPO and showDispo true
    }
  }, [logData, dispatch]);

  const handleCloseDispo = () => {
    dispatch(closeDispo());        // back to IDLE
    // dispatch(clearCurrentLead());  // optional: clear contact details
    // reset anything else you want
  };

  return (
    <div className="min-h-screen p-6 bg-[hsl(231_58%_6%)] text-white">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <TotalDialsToday />
        </div>

        <div className="lg:col-span-8">
          <ContactDetails />
        </div>
        <div className="lg:col-span-4">
          <AgentLeadsPanel />

        </div>
      </div>


      {showDispo && <CallDispositionPopup closeDispo={handleCloseDispo} />}
    </div>
  );
}
