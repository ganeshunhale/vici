import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactDetails from "../components/ContactDetails";
import CallDispositionPopup from "../components/CallDispositionPopup";

import { useGetLogDataQuery, usePingQuery } from "../services/dashboardApi";
import { closeDispo, openDispo, CALL_STATE, selectCallState, selectShowDispo, setIsCallbackDial, } from "../slices/callSlice";
import { selectIsAdmin, selectUser } from "../slices/authSlice";
import { clearCurrentLead } from "../slices/dialSlice";
import AgentLeadsPanel from "../components/AgentLeadsPanel";
import TotalDialsToday from "../components/TotalDialsToday";
import CallbackListPanel from "../components/CallbackListPanel";
import UserTimelineChart from "../components/AgentTimelineChart";

export default function CallPage() {
  const isAdmin = useSelector(selectIsAdmin);
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

  const shouldPollLog = callState === CALL_STATE.INCALL || callState === CALL_STATE.ENDING;
  const [pollingEnabled, setPollingEnabled] = useState(false);


  const { data: logData } = useGetLogDataQuery(user.user, {
    skip: !pollingEnabled,
    pollingInterval: pollingEnabled ? 2000 : 0,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!shouldPollLog) return setPollingEnabled(false);

    const t = setTimeout(() => {
      setPollingEnabled(true);
    }, 10000); // 5 sec delay

    return () => clearTimeout(t);
  }, [shouldPollLog]);

  useEffect(() => {
    console.log({logData, isAdmin})
    if(!logData || isAdmin) return
    if (logData?.inCall) return;
    dispatch(openDispo());
  }, [logData, dispatch, isAdmin]);

  const handleCloseDispo = () => {
    dispatch(closeDispo());        // back to IDLE
    dispatch(setIsCallbackDial(false))
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
        <div className="lg:col-span-4">
          <CallbackListPanel />

        </div>
        <div className="lg:col-span-4">
          <UserTimelineChart />

        </div>

      </div>


      {showDispo && !isAdmin && <CallDispositionPopup closeDispo={handleCloseDispo} />}
    </div>
  );
}
