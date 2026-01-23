// import { configureStore } from '@reduxjs/toolkit';
// import dashboardReducer from './slices/dashboardSlice';

// export const store = configureStore({
//   reducer: {
//     dashboard: dashboardReducer,
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import { dashboardApi } from './services/dashboardApi';
import sessionReducer from "./slices/sessionSlice";
import authReducer from "./slices/authSlice";
import dialReducer from "./slices/dialSlice";
import callReducer from "./slices/callSlice";

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    session: sessionReducer,auth:authReducer,
    dial: dialReducer,
    call: callReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});
