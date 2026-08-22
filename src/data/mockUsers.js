export const mockUsers = [
  {
    id: 'usr-1',
    name: 'Oren Developer',
    email: 'oren@dailydev.com',
    username: 'orendev',
    avatar: 'https://i.pravatar.cc/150?u=usr-1',
    role: 'writer', // 'user' | 'writer' | 'admin'
    bio: 'Full-stack software engineer & tech blogger. Passionate about React, UI design systems, and Web architecture.',
    joinedDate: '2025-01-15T00:00:00Z',
    subscriptions: ['cat-1', 'cat-2', 'cat-5'],
    savedPosts: ['post-101', 'post-102'],
    stats: {
      articlesPublished: 12,
      totalReads: 4850,
      followersCount: 320,
    },
    status: 'active', // 'active' | 'suspended' | 'pending'
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    email: 'sarah.c@design.io',
    username: 'sarahdesign',
    avatar: 'https://i.pravatar.cc/150?u=usr-2',
    role: 'writer',
    bio: 'Product Designer & Accessibility Lead. Crafting clean interfaces and inclusive digital experiences.',
    joinedDate: '2025-03-22T00:00:00Z',
    subscriptions: ['cat-2', 'cat-4'],
    savedPosts: ['post-102'],
    stats: {
      articlesPublished: 8,
      totalReads: 2910,
      followersCount: 215,
    },
    status: 'active',
  },
  {
    id: 'usr-3',
    name: 'Alex Rivera',
    email: 'alex.r@cloudops.net',
    username: 'arivera',
    avatar: 'https://i.pravatar.cc/150?u=usr-3',
    role: 'user',
    bio: 'DevOps Enthusiast & SRE learning frontend tricks.',
    joinedDate: '2025-06-10T00:00:00Z',
    subscriptions: ['cat-1', 'cat-3'],
    savedPosts: ['post-103'],
    stats: {
      articlesPublished: 0,
      totalReads: 0,
      followersCount: 14,
    },
    status: 'active',
  },
  {
    id: 'usr-4',
    name: 'Admin Boss',
    email: 'admin@dailydev.com',
    username: 'sysadmin',
    avatar: 'https://i.pravatar.cc/150?u=usr-4',
    role: 'admin',
    bio: 'Platform administrator & content moderator.',
    joinedDate: '2024-11-01T00:00:00Z',
    subscriptions: ['cat-1', 'cat-2', 'cat-3', 'cat-4', 'cat-5'],
    savedPosts: [],
    stats: {
      articlesPublished: 0,
      totalReads: 0,
      followersCount: 1200,
    },
    status: 'active',
  },
];

// Helper to quickly grab the default logged-in user for AuthContext demo
export const currentMockUser = mockUsers[0];

export default mockUsers;