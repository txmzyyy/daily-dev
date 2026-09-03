import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './contentApi';


//TRANSFORM CONTENT FROM BACKEND

const MEDIA_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function resolveMediaUrl(value) {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${MEDIA_BASE_URL}${value}`;
  return value;
}

function transformContent(item) {
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    title: item.title || '',

    summary:
      item.type === 'article' && item.body_or_url
        ? item.body_or_url.slice(0, 140)
        : '',

    body_or_url: resolveMediaUrl(item.body_or_url),

    author: {
      name: item.author || 'Unknown Author',
      avatar: item.author_avatar || null,
      role: item.author_role || 'Contributor',
    },

    type: item.type || 'article',

    category: item.category || 'Uncategorized',

    category_id: item.category_id || null,

    readTime: null,

    likes: Number(item.likes || 0),

    dislikes: Number(item.dislikes || 0),

    commentsCount: Number(item.comments_count || 0),

    date: item.created_at
      ? new Date(item.created_at).toLocaleDateString()
      : '',

    created_at: item.created_at || null,

    thumbnail: item.thumbnail || null,

    status: item.status || null,

    author_id: item.author_id || null,

    isWishlisted: false,
  };
}

// LOAD FEED


export const loadFeed = createAsyncThunk(
  'content/loadFeed',

  async (categoryId, { rejectWithValue }) => {
    try {
      const raw = await api.fetchFeed(categoryId);

      if (!Array.isArray(raw)) {
        return [];
      }

      return raw
        .map(transformContent)
        .filter(Boolean);

    } catch (err) {
      console.error('LOAD FEED ERROR:', err);

      return rejectWithValue(
        err.message || 'Failed to load feed'
      );
    }
  }
);


// LOAD RECOMMENDED


export const loadRecommended = createAsyncThunk(
  'content/loadRecommended',

  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;

      /*
       * If there is no token, don't call the protected
       * recommendation endpoint.
       */

      if (!token) {
        return [];
      }

      const raw = await api.fetchRecommended(token);

      if (!Array.isArray(raw)) {
        return [];
      }

      return raw
        .map(transformContent)
        .filter(Boolean);

    } catch (err) {
      console.error(
        'LOAD RECOMMENDED ERROR:',
        err
      );

      return rejectWithValue(
        err.message || 'Failed to load recommendations'
      );
    }
  }
);

// LOAD SINGLE CONTENT


export const loadContentById = createAsyncThunk(
  'content/loadContentById',

  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue(
          'Content ID is missing'
        );
      }

      console.log(
        'Loading content with ID:',
        id
      );

      const raw =
        await api.fetchContentById(id);

      console.log(
        'Content received:',
        raw
      );

      if (!raw) {
        return rejectWithValue(
          'Content not found'
        );
      }

      const transformed =
        transformContent(raw);

      if (!transformed) {
        return rejectWithValue(
          'Unable to process content'
        );
      }

      return transformed;

    } catch (err) {
      console.error(
        'LOAD CONTENT ERROR:',
        err
      );

      return rejectWithValue(
        err.message || 'Content not found'
      );
    }
  }
);

// CREATE CONTENT


export const submitContent = createAsyncThunk(
  'content/submitContent',

  async (
    data,
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        getState().auth?.token;

      if (!token) {
        return rejectWithValue(
          'You must be logged in to create content'
        );
      }

      const raw =
        await api.createContent(
          data,
          token
        );

      const transformed =
        transformContent(raw);

      return transformed;

    } catch (err) {
      console.error(
        'CREATE CONTENT ERROR:',
        err
      );

      return rejectWithValue(
        err.message ||
          'Failed to create content'
      );
    }
  }
);

// LIKE


export const toggleLike = createAsyncThunk(
  'content/toggleLike',

  async (
    id,
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        getState().auth?.token;

      if (!token) {
        return rejectWithValue(
          'You must be logged in to like content'
        );
      }

      const counts =
        await api.reactToContent(
          id,
          'like',
          token
        );

      return {
        id,
        likes: counts?.likes ?? 0,
        dislikes: counts?.dislikes ?? 0,
      };

    } catch (err) {
      console.error(
        'LIKE ERROR:',
        err
      );

      return rejectWithValue(
        err.message || 'Failed to react'
      );
    }
  }
);


// WISHLIST LOAD


export const loadWishlist = createAsyncThunk(
  'content/loadWishlist',

  async (
    _,
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        getState().auth?.token;

      /*
       * Wishlist is protected.
       * Don't make a request when there is no token.
       */

      if (!token) {
        return [];
      }

      const raw =
        await api.fetchWishlist(token);

      if (!Array.isArray(raw)) {
        return [];
      }

      return raw
        .map(transformContent)
        .filter(Boolean);

    } catch (err) {
      console.error(
        'LOAD WISHLIST ERROR:',
        err
      );

      return rejectWithValue(
        err.message || 'Failed to load wishlist'
      );
    }
  }
);

// TOGGLE WISHLIST


export const toggleWishlist = createAsyncThunk(
  'content/toggleWishlist',

  async (
    id,
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        getState().auth?.token;

      if (!token) {
        return rejectWithValue(
          'You must be logged in to use wishlist'
        );
      }

      const state =
        getState();

      const isSaved =
        state.content.wishlistIds.includes(id);

      if (isSaved) {
        await api.removeFromWishlist(
          id,
          token
        );
      } else {
        await api.addToWishlist(
          id,
          token
        );
      }

      return {
        id,
        isSaved: !isSaved,
      };

    } catch (err) {
      console.error(
        'WISHLIST ERROR:',
        err
      );

      return rejectWithValue(
        err.message || 'Failed to update wishlist'
      );
    }
  }
);

// LOAD COMMENTS


export const loadComments = createAsyncThunk(
  'content/loadComments',

  async (
    contentId,
    { rejectWithValue }
  ) => {
    try {
      if (!contentId) {
        return rejectWithValue(
          'Content ID is missing'
        );
      }

      console.log(
        'Loading comments for content:',
        contentId
      );

      const comments =
        await api.fetchComments(
          contentId
        );

      console.log(
        'Comments received:',
        comments
      );

      if (!Array.isArray(comments)) {
        return [];
      }

      return comments;

    } catch (err) {
      console.error(
        'LOAD COMMENTS ERROR:',
        err
      );

      return rejectWithValue(
        err.message || 'Failed to load comments'
      );
    }
  }
);

// SUBMIT COMMENT


export const submitComment = createAsyncThunk(
  'content/submitComment',

  async (
    payload,
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        getState().auth?.token;

      if (!token) {
        return rejectWithValue(
          'You must be logged in to comment'
        );
      }

      if (!payload?.content_id) {
        return rejectWithValue(
          'Content ID is missing'
        );
      }

      if (!payload?.text?.trim()) {
        return rejectWithValue(
          'Comment cannot be empty'
        );
      }

      console.log(
        'Submitting comment:',
        payload
      );

      const comment =
        await api.postComment(
          payload,
          token
        );

      console.log(
        'Comment created:',
        comment
      );

      return comment;

    } catch (err) {
      console.error(
        'SUBMIT COMMENT ERROR:',
        err
      );

      return rejectWithValue(
        err.message || 'Failed to post comment'
      );
    }
  }
);

// INITIAL STATE


const initialState = {
  items: [],

  recommended: [],

  current: null,

  comments: [],

  wishlist: [],

  wishlistIds: [],

  selectedCategory: 'For You',

  activeTab: 'For You',

  status: 'idle',

  currentStatus: 'idle',

  commentsStatus: 'idle',

  error: null,

  currentError: null,

  commentsError: null,
};

// SLICE


const contentSlice = createSlice({
  name: 'content',

  initialState,

  reducers: {

    setSelectedCategory: (
      state,
      action
    ) => {
      state.selectedCategory =
        action.payload;
    },

    setActiveTab: (
      state,
      action
    ) => {
      state.activeTab =
        action.payload;
    },

    clearCurrentContent: (
      state
    ) => {
      state.current = null;

      state.currentStatus =
        'idle';

      state.currentError =
        null;

      state.comments = [];

      state.commentsStatus =
        'idle';

      state.commentsError =
        null;
    },

    clearComments: (
      state
    ) => {
      state.comments = [];

      state.commentsStatus =
        'idle';

      state.commentsError =
        null;
    },

  },

// ASYNC ACTIONS
  

  extraReducers: (builder) => {

    builder


      
        // FEED
      

      .addCase(
        loadFeed.pending,
        (state) => {
          state.status =
            'loading';

          state.error =
            null;
        }
      )

      .addCase(
        loadFeed.fulfilled,
        (state, action) => {
          state.status =
            'succeeded';

          state.error =
            null;

          state.items =
            action.payload.map(
              (item) => ({
                ...item,

                isWishlisted:
                  state.wishlistIds.includes(
                    item.id
                  ),
              })
            );
        }
      )

      .addCase(
        loadFeed.rejected,
        (state, action) => {
          state.status =
            'failed';

          state.error =
            action.payload ||
            'Failed to load feed';
        }
      )


      
        // RECOMMENDED
     

      .addCase(
        loadRecommended.pending,
        (state) => {
          state.error =
            null;
        }
      )

      .addCase(
        loadRecommended.fulfilled,
        (state, action) => {
          state.recommended =
            action.payload;
        }
      )

      .addCase(
        loadRecommended.rejected,
        (state, action) => {
          state.recommended =
            [];

          console.warn(
            'Recommendations failed:',
            action.payload
          );
        }
      )


     
        //SINGLE CONTENT
    

      .addCase(
        loadContentById.pending,
        (state) => {
          state.currentStatus =
            'loading';

          state.currentError =
            null;

        

          state.current =
            null;
        }
      )

      .addCase(
        loadContentById.fulfilled,
        (state, action) => {
          state.currentStatus =
            'succeeded';

          state.currentError =
            null;

          state.current = {
            ...action.payload,

            isWishlisted:
              state.wishlistIds.includes(
                action.payload.id
              ),
          };
        }
      )

      .addCase(
        loadContentById.rejected,
        (state, action) => {
          state.currentStatus =
            'failed';

          state.current =
            null;

          state.currentError =
            action.payload ||
            'Content not found';
        }
      )


      
        // CREATE CONTENT
     

      .addCase(
        submitContent.fulfilled,
        (state, action) => {
          if (action.payload) {
            state.items.unshift(
              action.payload
            );
          }
        }
      )


  
       //  LIKE
      

      .addCase(
        toggleLike.fulfilled,
        (state, action) => {

          const {
            id,
            likes,
            dislikes,
          } = action.payload;

          const updateItem = (
            item
          ) => {

            if (
              item &&
              item.id === id
            ) {

              if (
                likes !== undefined
              ) {
                item.likes =
                  likes;
              }

              if (
                dislikes !== undefined
              ) {
                item.dislikes =
                  dislikes;
              }
            }
          };

          state.items.forEach(
            updateItem
          );

          updateItem(
            state.current
          );
        }
      )


    
        // WISHLIST LOAD
     

      .addCase(
        loadWishlist.fulfilled,
        (state, action) => {

          state.wishlist =
            action.payload;

          state.wishlistIds =
            action.payload.map(
              (item) => item.id
            );

          state.items.forEach(
            (item) => {
              item.isWishlisted =
                state.wishlistIds.includes(
                  item.id
                );
            }
          );

          if (state.current) {
            state.current.isWishlisted =
              state.wishlistIds.includes(
                state.current.id
              );
          }
        }
      )

      .addCase(
        loadWishlist.rejected,
        (state) => {

          state.wishlist =
            [];

          state.wishlistIds =
            [];
        }
      )


      
        // WISHLIST TOGGLE
     

      .addCase(
        toggleWishlist.fulfilled,
        (state, action) => {

          const {
            id,
            isSaved,
          } =
            action.payload;


          if (isSaved) {

            if (
              !state.wishlistIds.includes(
                id
              )
            ) {
              state.wishlistIds.push(
                id
              );
            }


            const item =
              state.items.find(
                (item) =>
                  item.id === id
              );


            if (
              item &&
              !state.wishlist.some(
                (saved) =>
                  saved.id === id
              )
            ) {

              state.wishlist.push(
                item
              );
            }

          } else {

            state.wishlistIds =
              state.wishlistIds.filter(
                (itemId) =>
                  itemId !== id
              );


            state.wishlist =
              state.wishlist.filter(
                (item) =>
                  item.id !== id
              );
          }


          const item =
            state.items.find(
              (item) =>
                item.id === id
            );


          if (item) {
            item.isWishlisted =
              isSaved;
          }


          if (
            state.current &&
            state.current.id === id
          ) {
            state.current.isWishlisted =
              isSaved;
          }
        }
      )


     
        // COMMENTS LOAD
    

      .addCase(
        loadComments.pending,
        (state) => {

          state.commentsStatus =
            'loading';

          state.commentsError =
            null;

          /*
           * Clear old comments while loading.
           */

          state.comments =
            [];
        }
      )

      .addCase(
        loadComments.fulfilled,
        (state, action) => {

          state.commentsStatus =
            'succeeded';

          state.commentsError =
            null;

          state.comments =
            Array.isArray(
              action.payload
            )
              ? action.payload
              : [];
        }
      )

      .addCase(
        loadComments.rejected,
        (state, action) => {

          state.commentsStatus =
            'failed';

          state.commentsError =
            action.payload ||
            'Failed to load comments';

          state.comments =
            [];
        }
      )


      
       // SUBMIT COMMENT
      

      .addCase(
        submitComment.pending,
        (state) => {

          state.commentsError =
            null;
        }
      )

      .addCase(
        submitComment.fulfilled,
        (state, action) => {

          const newComment =
            action.payload;

          if (!newComment) {
            return;
          }

          if (
            !newComment.parent_comment_id
          ) {

            state.comments.push(
              newComment
            );
        

            if (state.current) {
              state.current.commentsCount =
                (state.current.commentsCount || 0) +
                1;
            }

            return;
          }


          const addReply = (
            list
          ) => {

            for (
              const comment of list
            ) {

              if (
                comment.id ===
                newComment.parent_comment_id
              ) {

                if (
                  !Array.isArray(
                    comment.replies
                  )
                ) {
                  comment.replies =
                    [];
                }

                comment.replies.push(
                  newComment
                );

                return true;
              }


              if (
                Array.isArray(
                  comment.replies
                ) &&
                addReply(
                  comment.replies
                )
              ) {
                return true;
              }
            }

            return false;
          };


          addReply(
            state.comments
          );


          if (state.current) {
            state.current.commentsCount =
              (state.current.commentsCount || 0) +
              1;
          }
        }
      )

      .addCase(
        submitComment.rejected,
        (state, action) => {

          state.commentsError =
            action.payload ||
            'Failed to post comment';
        }
      );

  },
});



  // ACTIONS


export const {
  setSelectedCategory,
  setActiveTab,
  clearCurrentContent,
  clearComments,
} = contentSlice.actions;



   // SELECTORS


export const selectCurrentContent = (
  state
) =>
  state.content.current;

export const selectContentLoading = (
  state
) =>
  state.content.currentStatus ===
  'loading';

export const selectContentError = (
  state
) =>
  state.content.currentError;

export const selectComments = (
  state
) =>
  state.content.comments;

export const selectCommentsLoading = (
  state
) =>
  state.content.commentsStatus ===
  'loading';

export const selectCommentsError = (
  state
) =>
  state.content.commentsError;



  // REDUCER


export default contentSlice.reducer;