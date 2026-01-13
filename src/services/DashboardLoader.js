// // DashboardLoader.jsx
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { dashboardApi } from './dashboardApi';

// export default function DashboardLoader() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Start all queries in background with subscription
//     // const overviewSub = dispatch(
//     //   dashboardApi.endpoints.getOverview.initiate(undefined, { subscribe: true })
//     // );
   
//     // const perfSub = dispatch(
//     //   dashboardApi.endpoints.getAgentPerformance.initiate(undefined, { subscribe: true })
//     // );
//     const statusSub = dispatch(
//       dashboardApi.endpoints.getCallStatus.initiate(undefined, { subscribe: true })
//     );
//     const allDataSub = dispatch(
//       dashboardApi.endpoints.getAllData.initiate(undefined, { subscribe: true })
//     );
//     const totaldialstoday = dispatch(
//       dashboardApi.endpoints.getTotalDialsToday.initiate(undefined, { subscribe: true })
//     );
//     const agentsproductivity = dispatch(
//       dashboardApi.endpoints.getAgentsProductivity.initiate(undefined, { subscribe: true })
//     );
//     const campaignPerformance = dispatch(
//       dashboardApi.endpoints.getCampaignPerformance.initiate(undefined, { subscribe: true })
//     );
//     const dialerPerformance = dispatch(
//       dashboardApi.endpoints.getDialerPerformance.initiate(undefined, { subscribe: true })
//     );
//     const hourlyPerformance = dispatch(
//       dashboardApi.endpoints.getHourlyPerformance.initiate(undefined, { subscribe: true })
//     );

//     return () => {
//       // Cleanup
//       // overviewSub.unsubscribe();
//       // perfSub.unsubscribe();
//       statusSub.unsubscribe();
//       allDataSub.unsubscribe();
//       totaldialstoday.unsubscribe();
//       agentsproductivity.unsubscribe();
//       campaignPerformance.unsubscribe();
//       dialerPerformance.unsubscribe();
//       hourlyPerformance.unsubscribe();
//     };
//   }, [dispatch]);

//   return null;
// }
