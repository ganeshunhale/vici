import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = 'http://192.168.15.61:8000';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({

  //   getOverview: builder.query({
  //     query: () => '/dashboard',
  //     providesTags: ['Dashboard'],
  //     pollingInterval: 60000,
  // skipPollingIfUnfocused: true,
  // keepUnusedDataFor: 60, 
  // extraOptions: {
  //   maxRetries: 3,
  // },
      
  //   }),

    getTotalDialsToday: builder.query({
      query: () => '/totaldialstoday',
      providesTags: ['Dashboard'],
  keepUnusedDataFor: 60, 
  extraOptions: {
    maxRetries: 3,
  },
      
    }),

    // getAgentsOnCalls: builder.query({
    //   query: () => '/getcallswaiting',
    //   providesTags: ['Dashboard'],
    //   pollingInterval: 60000,
      
    //   transformResponse: (res) => res.data,
    // }),

    // getAgentPerformance: builder.query({
    //   query: () => '/getagnetstimeoncall',
    //   providesTags: ['Dashboard'],
    //   pollingInterval: 60000,
    //   transformResponse: (res) =>
    //     res.data.map((a) => ({
    //       station: a.STATION,
    //       agent: a.USER,
    //       status: a.STATUS,
    //       callsHandled: a.CALLS,
    //       campaign: a.CAMPAIGN,
    //       talkTime: a.TALK_TIME_HH_MM_SS,
    //     })),
    // }),

    getCallStatus: builder.query({
      query: () => '/getcallbystatus',
      providesTags: ['Dashboard'],
      
    }),

    getAllData: builder.query({
      query: () => '/get_all_data',
      providesTags: ['Dashboard'],
    }),
    
    getAgentsProductivity: builder.query({
      query: () => '/agentsproductivity',
      providesTags: ['Dashboard'],
    }),
    
    getCampaignPerformance: builder.query({
      query: () => '/campaignperformance',
      providesTags: ['Dashboard'],
    }),
    getDialerPerformance: builder.query({
      query: () => '/dialerperformance',
      providesTags: ['Dashboard'],
    }),
    getHourlyPerformance: builder.query({
      query: () => '/hourlyperformance',
      providesTags: ['Dashboard'],
    }),
    getGraphData: builder.query({
      query: () => '/graphdata',
      providesTags: ['Dashboard'],
    }),
    getCompliancereview: builder.query({
      query: () => '/compliancereview',
      providesTags: ['Dashboard'],
    }),
    getLeadfunnel: builder.query({
      query: (params={}) => ({
        url: "/leadfunnel",
        params: Object.keys(params).length ? params : undefined,
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  // useGetOverviewQuery,
  // useGetAgentsOnCallsQuery,
  // useGetAgentPerformanceQuery,
  useGetCallStatusQuery,
  useGetAllDataQuery,
  useGetTotalDialsTodayQuery,
  useGetAgentsProductivityQuery,
  useGetCampaignPerformanceQuery,
  useGetDialerPerformanceQuery,
  useGetHourlyPerformanceQuery,
  useGetGraphDataQuery,
  useGetCompliancereviewQuery,
  useGetLeadfunnelQuery,

} = dashboardApi;
