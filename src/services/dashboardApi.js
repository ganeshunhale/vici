import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = 'http://192.168.15.61:8000';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
      pollingInterval: 60000,
  skipPollingIfUnfocused: true,
  keepUnusedDataFor: 60, 
  extraOptions: {
    maxRetries: 3,
  },
      
    }),
    getTotalDialsToday: builder.query({
      query: () => '/totaldialstoday',
      providesTags: ['Dashboard'],
      pollingInterval: 60000,
  skipPollingIfUnfocused: true,
  keepUnusedDataFor: 60, 
  extraOptions: {
    maxRetries: 3,
  },
      
    }),

    getAgentsOnCalls: builder.query({
      query: () => '/getcallswaiting',
      providesTags: ['Dashboard'],
      pollingInterval: 60000,
      
      transformResponse: (res) => res.data,
    }),

    getAgentPerformance: builder.query({
      query: () => '/getagnetstimeoncall',
      providesTags: ['Dashboard'],
      pollingInterval: 60000,
      transformResponse: (res) =>
        res.data.map((a) => ({
          station: a.STATION,
          agent: a.USER,
          status: a.STATUS,
          callsHandled: a.CALLS,
          campaign: a.CAMPAIGN,
          talkTime: a.TALK_TIME_HH_MM_SS,
        })),
    }),

    getCallStatus: builder.query({
      query: () => '/getcallbystatus',
      providesTags: ['Dashboard'],
      pollingInterval: 60000,
      transformResponse: (res) => {
        const rows = res?.data?.[0] ?? {};
        
        // Identify the total key (key containing 'Total', case-insensitive)
        const totalKey = Object.keys(rows).find((key) => /total/i.test(key));
      
        // Prepare the breakdown excluding the total
        const breakdown = Object.entries(rows)
          .filter(([key]) => key !== totalKey)
          .map(([name, value]) => ({ name, value }));
      
        console.log("Call Status Rows:", rows);
        console.log("Total Key:", totalKey);
      
        return {
          total: rows[totalKey] ?? 0,
          breakdown,
        }      
      },
    }),

    getAllData: builder.query({
      query: () => '/get_all_data',
      providesTags: ['Dashboard'],
      pollingInterval: 60000,
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetAgentsOnCallsQuery,
  useGetAgentPerformanceQuery,
  useGetCallStatusQuery,
  useGetAllDataQuery,
  useGetTotalDialsTodayQuery
} = dashboardApi;
