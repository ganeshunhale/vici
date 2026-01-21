// import { configureStore } from '@reduxjs/toolkit';
// import dashboardReducer from './slices/dashboardSlice';

// export const store = configureStore({
//   reducer: {
//     dashboard: dashboardReducer,
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import { dashboardApi } from './services/dashboardApi';
import sessionReducer from "./slices/sessionSlice"
export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});
