
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {
  apiLogin,
  apiSignup,
  apiUpdateProfile,
  apiFetchCurrentUser,
} from './authApi';



// LOCAL STORAGE

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');


// INITIAL STATE

const initialState = {
  user: storedUser
    ? JSON.parse(storedUser)
    : null,

  token: storedToken || null,

  isAuthenticated: !!storedToken,

  loading: false,

  error: null,
};

// SIGN UP

export const signup = createAsyncThunk(
  'auth/signup',

  async (data, { rejectWithValue }) => {
    try {
      return await apiSignup(data);
    } catch (err) {
      return rejectWithValue(
        err.message || 'Signup failed'
      );
    }
  }
);

// LOGIN

export const login = createAsyncThunk(
  'auth/login',

  async (credentials, { rejectWithValue }) => {
    try {
      return await apiLogin(credentials);
    } catch (err) {
      return rejectWithValue(
        err.message || 'Login failed'
      );
    }
  }
);

// GET CURRENT USER

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',

  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue(
          'No authentication token'
        );
      }

      return await apiFetchCurrentUser(token);

    } catch (err) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      return rejectWithValue(
        err.message || 'Session expired'
      );
    }
  }
);

// UPDATE PROFILE


export const updateProfile = createAsyncThunk(
  'auth/updateProfile',

  async (
    updates,
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue(
          'You must be logged in'
        );
      }

      return await apiUpdateProfile(
        updates,
        token
      );

    } catch (err) {
      return rejectWithValue(
        err.message || 'Failed to update profile'
      );
    }
  }
);

// SLICE

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {

    // LOGOUT

    logout: (state) => {

      state.user = null;

      state.token = null;

      state.isAuthenticated = false;

      state.loading = false;

      state.error = null;

      localStorage.removeItem('user');

      localStorage.removeItem('token');
    },

    clearAuthError: (state) => {
      state.error = null;
    },

  },

  extraReducers: (builder) => {

    builder
      
      // SIGN UP
  
      .addCase(
        signup.pending,
        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        signup.fulfilled,
        (state, action) => {

          state.loading = false;

          state.error = null;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          state.isAuthenticated = true;

          localStorage.setItem(
            'user',
            JSON.stringify(
              action.payload.user
            )
          );

          localStorage.setItem(
            'token',
            action.payload.token
          );
        }
      )

      .addCase(
        signup.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            'Signup failed';
        }
      )

      // LOGIN
     
      .addCase(
        login.pending,
        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        login.fulfilled,
        (state, action) => {

          state.loading = false;

          state.error = null;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          state.isAuthenticated = true;

          localStorage.setItem(
            'user',
            JSON.stringify(
              action.payload.user
            )
          );

          localStorage.setItem(
            'token',
            action.payload.token
          );
        }
      )

      .addCase(
        login.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            'Invalid email or password';
        }
      )

      // CURRENT USER
     
     .addCase(
        fetchCurrentUser.fulfilled,
        (state, action) => {

          const updatedUser =
            action.payload.user ||
            action.payload;

          state.user = updatedUser;

          state.isAuthenticated = true;

          localStorage.setItem(
            'user',
            JSON.stringify(updatedUser)
          );
        }
      )

      .addCase(
        fetchCurrentUser.rejected,
        (state, action) => {

          state.user = null;

          state.token = null;

          state.isAuthenticated = false;

          state.error =
            action.payload ||
            'Session expired';

          localStorage.removeItem('user');

          localStorage.removeItem('token');
        }
      )


     
      // UPDATE PROFILE

      .addCase(
        updateProfile.pending,
        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        updateProfile.fulfilled,
        (state, action) => {

          state.loading = false;

          state.error = null;

          const updatedUser =
            action.payload.user ||
            action.payload;

          state.user = updatedUser;

          localStorage.setItem(
            'user',
            JSON.stringify(updatedUser)
          );
        }
      )

      .addCase(
        updateProfile.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            'Failed to update profile';
        }
      );

  },
});


export const {
  logout,
  clearAuthError,
} = authSlice.actions;


export const selectUser = (state) =>
  state.auth.user;

export const selectToken = (state) =>
  state.auth.token;

export const selectUserRole = (state) =>
  state.auth.user?.role || null;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;



export default authSlice.reducer;

