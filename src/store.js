// import { configureStore } from '@reduxjs/toolkit';
// import dashboardReducer from './slices/dashboardSlice';

// export const store = configureStore({
//   reducer: {
//     dashboard: dashboardReducer,
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import { dashboardApi } from './services/dashboardApi';

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});
