import { OverviewCard } from '@/components/OverviewCard';
import { AgentsTable } from '@/components/AgentsTable';
import { PerformanceTable } from '@/components/PerformanceTable';
import { CallStatusChart } from '@/components/CallStatusChart';
import { UtilizationChart } from '@/components/UtilizationChart';
import { Users, Headphones, Clock, PhoneIncoming, PauseCircle, Phone, Loader} from 'lucide-react';
// import { useDispatch ,useSelector} from 'react-redux';
// import {
//   fetchOverview,
//   fetchAgentsOnCalls,
//   fetchAgentPerformance,
//   fetchCallStatus,
//   fetchAllData
// } from '@/slices/dashboardSlice';
// import { useEffect } from 'react';
import { DialerStats } from '../components/DialerStatsCard';
import { useGetAgentPerformanceQuery, useGetAgentsOnCallsQuery, useGetAllDataQuery, useGetCallStatusQuery, useGetOverviewQuery } from '../services/dashboardApi';
import CallsAgentsOverview from '../components/CallsAgentsOverview';
import TotalDialsToday from '../components/TotalDialsToday';
export default function Dashboard() {
  // const { overview, agentsOnCalls, agentPerformance, callStatus,allData } = useSelector(state => state.dashboard);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchOverview());
  //   dispatch(fetchAgentsOnCalls());
  //   dispatch(fetchAgentPerformance());
  //   dispatch(fetchCallStatus());
  //   dispatch(fetchAllData());

  //   // optional polling
  //   // const interval = setInterval(() => {
  //   //   dispatch(fetchOverview());
  //   // }, 5000);

  //   // return () => clearInterval(interval);
  // }, [dispatch]);
  // useEffect(() => {
  //   console.log("All Data:", allData);
  // }, [allData])

    const { data:overview,  isLoading: overviewLoading} = useGetOverviewQuery(undefined, {
      pollingInterval:  30000,
      skipPollingIfUnfocused: true,
    });

  const { data: agentsOnCalls = [] } =
    useGetAgentsOnCallsQuery(undefined, {
      pollingInterval:  30000,
      skipPollingIfUnfocused: true,
    });

  const { data: agentPerformance = [] } =
    useGetAgentPerformanceQuery(undefined, {
      pollingInterval:  30000,
      skipPollingIfUnfocused: true,
    });

  const { data: callStatus } =
    useGetCallStatusQuery(undefined, {
      pollingInterval:  30000,
      skipPollingIfUnfocused: true,
    });

  const { data: allData } =
    useGetAllDataQuery(undefined, {
      pollingInterval:  30000,
      skipPollingIfUnfocused: true,
    });

  if (overviewLoading) return <Loader />;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

    {/* LEFT COLUMN */}
    <div className="lg:col-span-2 space-y-6">

      {/* CALLS & AGENTS OVERVIEW */}
      {/* <CallsAgentsOverview overview={overview.data} /> */}
<TotalDialsToday/>
      {/* TABLES STACK NATURALLY ON MOBILE */}
      <AgentsTable data={agentsOnCalls} />
      <PerformanceTable data={agentPerformance} />
    </div>

    {/* RIGHT COLUMN */}
    <div className="space-y-6">

      {/* CALL STATUS */}
      <div className="border border-slate-800 rounded-lg p-4 sm:p-6 bg-slate-900/30">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg sm:text-xl leading-tight font-semibold text-white">
              Calls by Status
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Distribution across Active / Ringing / IVR
            </p>
          </div>
        </div>

        <CallStatusChart callStatus={callStatus} />

        <div className="mt-4 flex justify-between text-sm border-t border-slate-700 pt-4">
          <span className="text-slate-300">Total Calls</span>
          <span className="font-mono text-white font-semibold">
            {callStatus?.total}
          </span>
        </div>
      </div>

      {/* DIALER HEALTH */}
      <DialerStats allData={allData} />
    </div>
  </div>
  );
}
