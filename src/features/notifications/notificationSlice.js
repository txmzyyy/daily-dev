import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './notificationApi';

export const loadNotifications = createAsyncThunk(
  'notifications/loadNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      return await api.fetchNotifications(getState().auth.token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (id, { getState, rejectWithValue }) => {
    try {
      return await api.markNotificationRead(id, getState().auth.token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { getState, rejectWithValue }) => {
    try {
      await api.markAllNotificationsRead(getState().auth.token);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  status: 'idle',
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNotifications.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.is_read).length;
      })
      .addCase(loadNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const id = action.payload?.id;
        const notification = state.notifications.find((n) => n.id === id);
        if (notification && !notification.is_read) {
          notification.is_read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => { n.is_read = true; });
        state.unreadCount = 0;
      });
  },
});

export default notificationSlice.reducer;
