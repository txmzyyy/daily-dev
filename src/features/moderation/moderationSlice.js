import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import * as api from './moderationApi';


export const loadPendingContent =
  createAsyncThunk(
    'moderation/loadPendingContent',

    async (_, { getState, rejectWithValue }) => {
      try {
        const token =
          getState().auth.token;

        return await api.fetchPendingContent(
          token
        );

      } catch (err) {
        return rejectWithValue(
          err.message
        );
      }
    }
  );


export const approve =
  createAsyncThunk(
    'moderation/approve',

    async (
      id,
      { getState, rejectWithValue }
    ) => {
      try {
        const token =
          getState().auth.token;

        await api.approveContent(
          id,
          token
        );

        return id;

      } catch (err) {
        return rejectWithValue(
          err.message
        );
      }
    }
  );


export const removeContent =
  createAsyncThunk(
    'moderation/removeContent',

    async (
      id,
      { getState, rejectWithValue }
    ) => {
      try {
        const token =
          getState().auth.token;

        await api.deleteContent(
          id,
          token
        );

        return id;

      } catch (err) {
        return rejectWithValue(
          err.message
        );
      }
    }
  );


export const loadReports =
  createAsyncThunk(
    'moderation/loadReports',

    async (
      status = 'pending',
      { getState, rejectWithValue }
    ) => {
      try {
        const token =
          getState().auth.token;

        return await api.fetchReports(
          status,
          token
        );

      } catch (err) {
        return rejectWithValue(
          err.message
        );
      }
    }
  );


export const fileContentReport =
  createAsyncThunk(
    'moderation/fileContentReport',

    async (
      { contentId, reason },
      { getState, rejectWithValue }
    ) => {
      try {
        const token =
          getState().auth.token;

        return await api.fileReport(
          contentId,
          reason,
          token
        );

      } catch (err) {
        return rejectWithValue(
          err.message
        );
      }
    }
  );


export const dismiss =
  createAsyncThunk(
    'moderation/dismiss',

    async (
      id,
      { getState, rejectWithValue }
    ) => {
      try {
        const token =
          getState().auth.token;

        await api.dismissReport(
          id,
          token
        );

        return id;

      } catch (err) {
        return rejectWithValue(
          err.message
        );
      }
    }
  );


export const resolve =
  createAsyncThunk(
    'moderation/resolve',

    async (
      id,
      { getState, rejectWithValue }
    ) => {
      try {
        const token =
          getState().auth.token;

        await api.resolveReport(
          id,
          token
        );

        return id;

      } catch (err) {
        return rejectWithValue(
          err.message
        );
      }
    }
  );


const initialState = {
  pendingContent: [],
  reports: [],
  status: 'idle',
  error: null,
};


const moderationSlice = createSlice({
  name: 'moderation',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        loadPendingContent.pending,
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )

      .addCase(
        loadPendingContent.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.pendingContent =
            action.payload;
        }
      )

      .addCase(
        loadPendingContent.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error =
            action.payload;
        }
      )


      .addCase(
        approve.fulfilled,
        (state, action) => {
          state.pendingContent =
            state.pendingContent.filter(
              (content) =>
                content.id !==
                action.payload
            );
        }
      )


      .addCase(
        removeContent.fulfilled,
        (state, action) => {
          state.pendingContent =
            state.pendingContent.filter(
              (content) =>
                content.id !==
                action.payload
            );
        }
      )


      .addCase(
        loadReports.fulfilled,
        (state, action) => {
          state.reports =
            action.payload;
        }
      )


      .addCase(
        dismiss.fulfilled,
        (state, action) => {
          state.reports =
            state.reports.filter(
              (report) =>
                report.id !==
                action.payload
            );
        }
      )


      .addCase(
        resolve.fulfilled,
        (state, action) => {
          state.reports =
            state.reports.filter(
              (report) =>
                report.id !==
                action.payload
            );
        }
      );
  },
});


export default moderationSlice.reducer;