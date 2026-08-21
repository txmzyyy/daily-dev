import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    { id: 'n1', title: 'New Frontend Article', message: 'Priya Nair posted React Server Components guide', time: '2 hours ago', read: false },
    { id: 'n2', title: 'DevOps Content Updated', message: 'New Video uploaded in DevOps section', time: '1 day ago', read: true },
  ],
  unreadCount: 1,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
      state.unreadCount = 0;
    },
  },
});

export const { markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;