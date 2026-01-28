import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { showSessionPopup } from '../slices/sessionSlice.js';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.15.61:8000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// ✅ Interceptor
const baseQueryWithSession = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(showSessionPopup());
  }

  return result;
};
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithSession,
  tagTypes: ['Dashboard', "Leads"],
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
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
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
      query: (params = {}) => ({
        url: "/leadfunnel",
        params: Object.keys(params).length ? params : undefined,
      }),
      providesTags: ["Dashboard"],
    }),
    uploadExcelLeads: builder.mutation({
      query: (formData) => ({
        url: "/upload_excel_leads",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Leads"],
    }),

    getLeads: builder.query({
      query: (params = {}) => ({
        url: "/leads",
        params: Object.keys(params).length ? params : undefined,
      }),
      providesTags: ["Leads"],
    }),
    dialNext: builder.mutation({
      query: (params={}) => ({
        url: "/call",
        method: "POST",
        // body: body ?? {}, 
        // params: { phone },
        params: Object.keys(params).length ? params : undefined,
      }),
    }),
    callHangup: builder.mutation({
      query: () => ({
        url: "/hangup",
        method: "POST",

      }),
    }),
    getLogData: builder.query({
      query: (user) => ({
        url: "/logdata",
        method: "POST",
        params: { user },
      }),
    }),

    submitStatus: builder.mutation({
      query: (params = {}) => ({
        url: "/vicidial-agent",
        method: "POST",
        params: Object.keys(params).length ? params : undefined,
      }),
    }),
    getAgentWiseLead: builder.query({
      query: (params={}) => ({
        url: "/clients_for_agent",
        method: "POST",
        params: Object.keys(params).length ? params : undefined,
      }),
      providesTags: ["Leads"],
    }),
    ping: builder.query({
      query: () => "/ping",
    }),
    userTimeline: builder.query({
      query: () => "/usertimeline",
    }),
    getCampaigns: builder.query({
      query: () => "/campaigns",
    }),
  }),
});

export const {
  // useGetOverviewQuery,
  // useGetAgentsOnCallsQuery,
  // useGetAgentPerformanceQuery,
  useLoginMutation,
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
  useUploadExcelLeadsMutation,
  useGetLeadsQuery,
  useDialNextMutation,
  useCallHangupMutation,
  useGetLogDataQuery,
  useSubmitStatusMutation,
  useGetAgentWiseLeadQuery,
  usePingQuery,
  useUserTimelineQuery,
  useGetCampaignsQuery,
} = dashboardApi;
