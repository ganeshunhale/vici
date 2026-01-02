// DashboardLoader.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dashboardApi } from './dashboardApi';

export default function DashboardLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Start all queries in background with subscription
    const overviewSub = dispatch(
      dashboardApi.endpoints.getOverview.initiate(undefined, { subscribe: true })
    );
    const agentsSub = dispatch(
      dashboardApi.endpoints.getAgentsOnCalls.initiate(undefined, { subscribe: true })
    );
    const perfSub = dispatch(
      dashboardApi.endpoints.getAgentPerformance.initiate(undefined, { subscribe: true })
    );
    const statusSub = dispatch(
      dashboardApi.endpoints.getCallStatus.initiate(undefined, { subscribe: true })
    );
    const allDataSub = dispatch(
      dashboardApi.endpoints.getAllData.initiate(undefined, { subscribe: true })
    );
    const totaldialstoday = dispatch(
      dashboardApi.endpoints.getTotalDialsToday.initiate(undefined, { subscribe: true })
    );

    return () => {
      // Cleanup
      overviewSub.unsubscribe();
      agentsSub.unsubscribe();
      perfSub.unsubscribe();
      statusSub.unsubscribe();
      allDataSub.unsubscribe();
      totaldialstoday.unsubscribe();
    };
  }, [dispatch]);

  return null;
}
