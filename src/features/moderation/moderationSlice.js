import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flaggedReports: [
    { id: 'r1', contentId: 'c1', reason: 'Inappropriate terminology', reportedBy: 'user_99' }
  ],
};

const moderationSlice = createSlice({
  name: 'moderation',
  initialState,
  reducers: {
    reportContent: (state, action) => {
      state.flaggedReports.push(action.payload);
    },
    dismissReport: (state, action) => {
      state.flaggedReports = state.flaggedReports.filter(r => r.id !== action.payload);
    }
  },
});

export const { reportContent, dismissReport } = moderationSlice.actions;
export default moderationSlice.reducer;