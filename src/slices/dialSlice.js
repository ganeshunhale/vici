import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs"

const initialState = {
  currentLead: null, // <-- will store response.details
  isPaused: false,
  autoDialTime: dayjs().add(60, "seconds").valueOf()
};

const dialSlice = createSlice({
  name: "dial",
  initialState,
  reducers: {
    setCurrentLead(state, action) {
      state.currentLead = action.payload; // details object
    },
    clearCurrentLead(state) {
      state.currentLead = null;
    },
    togglePause(state){
      state.isPaused = !state.isPaused
    },
    resetAutoDialTime(state){
      state.autoDialTime = dayjs().add(60, "seconds").valueOf()
    }
  },
});

export const { setCurrentLead, clearCurrentLead, togglePause, resetAutoDialTime } = dialSlice.actions;
export default dialSlice.reducer;

export const selectCurrentLead = (state) => state.dial.currentLead;
