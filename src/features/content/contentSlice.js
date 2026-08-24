import { createSlice } from '@reduxjs/toolkit';

const initialItems = [
  {
    id: 'c1',
    title: 'React Server Components Are Changing How We Think About State',
    summary: 'A deep dive into RSC architecture, why client/server boundaries matter, and how streaming changes the mental model for React developers.',
    author: { name: 'Priya Nair', role: 'writer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    type: 'ARTICLE',
    category: 'Frontend',
    readTime: '9 min read',
    likes: 1800,
    commentsCount: 97,
    date: '2026-08-15',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    content: 'Full body content of React Server Components article...',
    isApproved: true,
    isFlagged: false,
    isWishlisted: true,
  },
  {
    id: 'c2',
    title: 'Kubernetes in 2026: When to Reach for It (And When Not To)',
    summary: "K8s is overkill for most teams — until it isn't. This video breaks down the actual inflection points with real cost data and architecture patterns.",
    author: { name: 'DevOps Master', role: 'writer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    type: 'VIDEO',
    category: 'DevOps',
    readTime: '24 min',
    likes: 3200,
    commentsCount: 142,
    date: '2026-08-14',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isApproved: true,
    isFlagged: false,
    isWishlisted: false,
  },
  {
    id: 'c3',
    title: 'Building Scalable Microservices with Flask and PostgreSQL',
    summary: 'An architectural walkthrough on building resilient backend services at Moringa scale using Python, SQLAlchemy, and Async Flask.',
    author: { name: 'Alex Kim', role: 'writer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    type: 'PODCAST',
    category: 'Backend',
    readTime: '45 min',
    likes: 950,
    commentsCount: 38,
    date: '2026-08-12',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    content: 'Audio stream url here...',
    isApproved: true,
    isFlagged: false,
    isWishlisted: true,
  }
];

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: initialItems,
    selectedCategory: 'For You',
    activeTab: 'For You', // 'For You', 'Following', 'Trending'
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    toggleWishlist: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.isWishlisted = !item.isWishlisted;
      }
    },
    toggleLike: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.likes += 1;
      }
    },
    addContent: (state, action) => {
      state.items.unshift({
        id: `c_${Date.now()}`,
        ...action.payload,
        likes: 0,
        commentsCount: 0,
        date: new Date().toISOString().split('T')[0],
        isApproved: false,
        isFlagged: false,
        isWishlisted: false,
      });
    },
    approveContentItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.isApproved = true;
    },
    flagContentItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.isFlagged = true;
    },
    deleteContentItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    }
  },
});

export const { 
  setSelectedCategory, 
  setActiveTab, 
  toggleWishlist, 
  toggleLike, 
  addContent, 
  approveContentItem, 
  flagContentItem, 
  deleteContentItem 
} = contentSlice.actions;

export default contentSlice.reducer;