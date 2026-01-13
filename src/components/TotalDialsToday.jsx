import React from 'react';
import { OverviewCard } from './OverviewCard';
import { Users, Headphones, Clock, PhoneIncoming, PauseCircle, Phone, Loader } from 'lucide-react';
import { useGetTotalDialsTodayQuery } from '../services/dashboardApi';

const TotalDialsToday = ({ overview }) => {
  const { data: TodaysDialsData ,isLoading} = useGetTotalDialsTodayQuery(undefined, {
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
  });

  const {
    call_date,
    total_dials,
    connected_calls,
    connection_rate_pct,
    total_talk_time,
    avg_talk_time_sec,
    leads_connected,
   
  } = TodaysDialsData?.data?.[0] || {};

  console.log('TodaysDialsData', TodaysDialsData, call_date);

  // Define KPIs dynamically
  const kpis = [
      { label: 'Call Date', value: call_date, icon: Phone, trend: '+3.2%', color: 'blue' }, // optional, if needed
    { label: 'Total Dials Today', value: total_dials, icon: PhoneIncoming, trend: '+16%', color: 'blue' },
    { label: 'Connected Calls', value: connected_calls, icon: Clock, trend: 'queue', color: 'amber' },
    { label: 'Connection Rate(%)', value: connection_rate_pct, icon: Clock, trend: 'stable', color: 'slate' },
    { label: 'Total Talk Time', value: total_talk_time, icon: Users, trend: 'total seats', color: 'blue' },
    { label: 'Avg Talk Time Sec', value: avg_talk_time_sec, icon: Headphones, trend: 'handling customers', color: 'blue' },
    { label: 'Leads Contacted', value: leads_connected, icon: Users, trend: 'idle & ready', color: 'blue' },
  ];
   if(isLoading )return (
    <div className="flex items-center justify-center h-[220px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) 
  return (
    <div className="p-2 max-w-screen-xl border border-border rounded-lg bg-card/60">
      <div className="flex justify-between items-center m-2 lg:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold p text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          Total Dials Today
        </h2>
      </div>
    <div className="flex gap-2 overflow-x-auto h-32 scrollbar-thin scrollbar-auto-hide">
        {kpis.map(({ label, value, icon, trend, color }) => (
          <OverviewCard
            key={label}
            label={label}
            value={value}
            icon={icon}
            trend={trend}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default TotalDialsToday;
