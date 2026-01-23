import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLead: null, // <-- will store response.details
  isPaused: false
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
    }
  },
});

export const { setCurrentLead, clearCurrentLead, togglePause } = dialSlice.actions;
export default dialSlice.reducer;

export const selectCurrentLead = (state) => state.dial.currentLead;
