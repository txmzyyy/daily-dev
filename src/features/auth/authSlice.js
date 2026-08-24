import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'u1',
    name: 'James Developer',
    email: 'james@moringa.dev',
    role: 'user', // 'user' | 'writer' | 'admin'
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    subscribedCategories: ['Frontend', 'DevOps']
  },
  isAuthenticated: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.user.role = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    toggleSubscribeCategory: (state, action) => {
      const cat = action.payload;
      if (state.user.subscribedCategories.includes(cat)) {
        state.user.subscribedCategories = state.user.subscribedCategories.filter(c => c !== cat);
      } else {
        state.user.subscribedCategories.push(cat);
      }
    }
  },
});

export const { setUserRole, loginSuccess, logout, toggleSubscribeCategory } = authSlice.actions;
export default authSlice.reducer;