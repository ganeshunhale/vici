// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_BASE = 'http://192.168.15.61:8000';

// // Dummy data from the image
// const INITIAL_STATE = {
//   allData: {},
//   overview: {
//     currentActiveCalls: 0,
//     callsRinging: 0,
//     callsWaiting: 0,
//     callsInIvr: 0,
//     agentsLoggedIn: 0,
//     agentsInCalls: 0,
//     agentsWaiting: 0,
//     agentsPaused: 0,
//   },
//   agentsOnCalls: [
//     {
//       "agent_id": "8010",
//       "agent_name": "DUMMY",
//       "campaign_id": "INTERN_C",
//       "status": "INCALL",
//       "calls_handled": 106
//   },
//   {
//       "agent_id": "8017",
//       "agent_name": "DUMMY",
//       "campaign_id": "INTERN_C",
//       "status": "INCALL",
//       "calls_handled": 101
//   },
//   {
//       "agent_id": "8005",
//       "agent_name": "DUMMY",
//       "campaign_id": "INTERN_C",
//       "status": "INCALL",
//       "calls_handled": 75
//   },
//   {
//       "agent_id": "8002",
//       "agent_name": "DUMMY",
//       "campaign_id": "INTERN_C",
//       "status": "PAUSED",
//       "calls_handled": 307
//   },
 
//   ],
//   agentPerformance: [
//     { station: 'SIP/8001', agent: 'DUMMY', status: 'INCALL', callsHandled: 45, talkTime: '03:45:10',campaign:'INTERN_C' },
//     { station: 'SIP/8002', agent: 'DUMMY', status: 'READY', callsHandled: 32, talkTime: '02:20:15',campaign:'INTERN_C'},
//     { station: 'SIP/8005', agent: 'DUMMY', status: 'INCALL', callsHandled: 28, talkTime: '02:10:00', campaign:'INTERN_C'},
//     { station: 'SIP/8008', agent: 'DUMMY', status: 'PAUSED', callsHandled: 51, talkTime: '04:12:30' ,campaign:'INTERN_C'},
//     { station: 'SIP/8012', agent: 'DUMMY', status: 'INCALL', callsHandled: 19, talkTime: '01:45:00',campaign:'INTERN_C' },
//   ],
//   callStatus: {
//     total: 0,
//   breakdown: [
//     { status: 'READY', total: 0 },
//     { status: 'PAUSED', total: 0 },
//     { status: 'Total', total: 0 },
//     { status: 'INCALL', total: 0 },
//   ], 
//   },
//   agentUtilization: {
//     active: 96,
//     ringing: 15,
//     paused: 2,
//     occupancy: '85%',
//     loggedIn: 119,
//   },
//   lastUpdated: new Date().toISOString(),
//   isLoading: false,
//   isError: false,
// };

// export const fetchOverview = createAsyncThunk(
//   'dashboard/fetchOverview',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_BASE}/dashboard`);
//       if (!res.ok) throw new Error();
//       return await res.json();
//     } catch {
//       return rejectWithValue();
//     }
//   }
// );
// export const fetchAgentsOnCalls = createAsyncThunk(
//   'dashboard/fetchAgentsOnCalls',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_BASE}/getcallswaiting`);
//       if (!res.ok) throw new Error();
//       const json = await res.json();
//       return json.data;
//     } catch {
//       return rejectWithValue();
//     }
//   }
// );
// export const fetchAgentPerformance = createAsyncThunk(
//   'dashboard/fetchAgentPerformance',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_BASE}/getagnetstimeoncall`);
//       if (!res.ok) throw new Error();
//       const json = await res.json();
//       return json.data;
//     } catch {
//       return rejectWithValue();
//     }
//   }
// );
// export const fetchCallStatus = createAsyncThunk(
//   'dashboard/fetchCallStatus',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_BASE}/getcallbystatus`);
//       if (!res.ok) throw new Error();
//       const json = await res.json();
//       return json.data;
//     } catch {
//       return rejectWithValue();
//     }
//   }
// );
// export const fetchAllData = createAsyncThunk(
//   'dashboard/fetchAllData',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_BASE}/get_all_data`);
//       if (!res.ok) throw new Error();
//       const json = await res.json();
//       console.log("API Response for All Data:", json);
//       return json;
//     } catch {
//       return rejectWithValue();
//     }
//   }
// );
// const dashboardSlice = createSlice({
//   name: 'dashboard',
//   initialState: INITIAL_STATE,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//     .addCase(fetchAllData.fulfilled, (state, action) => {
//       console.log("Fetched All Data:", action);
//       const d = action.payload;
//       state.allData = d;
//       state.lastUpdated = new Date().toISOString();
//     })
//       // OVERVIEW
//       .addCase(fetchOverview.fulfilled, (state, action) => {
//         const d = action.payload.data;
//         state.overview = {
//           currentActiveCalls: d.active_users,
//           callsRinging: d.ringing_calls,
//           callsWaiting: d.waiting_calls,
//           callsInIvr: d.calls_in_ivr,
//           agentsLoggedIn: d.agents_logged_in,
//           agentsInCalls: d.agents_in_calls,
//           agentsWaiting: d.agents_waiting,
//           agentsPaused: d.paused_agents,
//         };
//         state.lastUpdated = new Date().toISOString()
//       })

//       // AGENTS ON CALLS
//       .addCase(fetchAgentsOnCalls.fulfilled, (state, action) => {
//         state.agentsOnCalls = action.payload;
//         state.lastUpdated = new Date().toISOString();
//       })

//       // AGENT PERFORMANCE
//       .addCase(fetchAgentPerformance.fulfilled, (state, action) => {
//         state.agentPerformance = action.payload.map((a) => ({
//           station: a.STATION,
//           agent: a.USER,
//           status: a.STATUS,
//           callsHandled: a.CALLS,
//           campaign:a.CAMPAIGN, 
//           talkTime: a.TALK_TIME_HH_MM_SS,
        
//         }));
//       })

//       // CALL STATUS
//       .addCase(fetchCallStatus.fulfilled, (state, action) => {
//         const rows = action.payload || [];
//       console.log("Call Status Rows:", rows);
//         const totalRow = rows.find(r => r.status === 'Total');
//         const breakdown = rows.filter(r => r.status !== 'Total');
      
//         state.callStatus = {
//           total: totalRow?.total || 0,
//           breakdown: breakdown.map(r => ({
            
//             name: r.status,
//             value: r.total,
//           })),
//         };
      
//         state.lastUpdated = new Date().toISOString()
//       });

      
      
//   },
// });

// export default dashboardSlice.reducer;
