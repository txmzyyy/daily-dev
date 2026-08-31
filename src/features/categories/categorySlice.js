import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}
// FETCH CATEGORIES


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/categories`);

      if (!res.ok) {
        throw new Error('Failed to load categories');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ADD CATEGORY


export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (name, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${BASE_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(token),
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to add category');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE CATEGORY


export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, name }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(token),
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to update category');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE CATEGORY


export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to delete category');
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// SUBSCRIPTIONS


export const subscribeCategory = createAsyncThunk(
  'categories/subscribeCategory',
  async (categoryId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${BASE_URL}/api/subscriptions/${categoryId}`,
        {
          method: 'POST',
          headers: authHeaders(token),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to subscribe');
      }

      return categoryId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const unsubscribeCategory = createAsyncThunk(
  'categories/unsubscribeCategory',
  async (categoryId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `${BASE_URL}/api/subscriptions/${categoryId}`,
        {
          method: 'DELETE',
          headers: authHeaders(token),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to unsubscribe');
      }

      return categoryId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loadSubscriptions = createAsyncThunk(
  'categories/loadSubscriptions',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${BASE_URL}/api/subscriptions`, {
        headers: authHeaders(token),
      });

      if (!res.ok) {
        throw new Error('Failed to load subscriptions');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// STATE


const initialState = {
  categories: [],
  subscriptions: [],
  subscribedCategoryIds: [],
  status: 'idle',
  error: null,
};

 //SLICE


const categorySlice = createSlice({
  name: 'categories',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );

        state.subscribedCategoryIds =
          state.subscribedCategoryIds.filter(
            (id) => id !== action.payload
          );
      })

      .addCase(removeCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* SUBSCRIPTIONS */
      .addCase(loadSubscriptions.fulfilled, (state, action) => {
        state.subscriptions = action.payload;

        state.subscribedCategoryIds = action.payload.map(
          (category) => category.id
        );
      })

      .addCase(loadSubscriptions.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(subscribeCategory.fulfilled, (state, action) => {
        if (!state.subscribedCategoryIds.includes(action.payload)) {
          state.subscribedCategoryIds.push(action.payload);
        }
      })

      .addCase(subscribeCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(unsubscribeCategory.fulfilled, (state, action) => {
        state.subscribedCategoryIds =
          state.subscribedCategoryIds.filter(
            (id) => id !== action.payload
          );

        state.subscriptions = state.subscriptions.filter(
          (category) => category.id !== action.payload
        );
      })

      .addCase(unsubscribeCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;