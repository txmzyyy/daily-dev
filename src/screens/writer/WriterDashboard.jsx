import React, { useState } from 'react';
import { FileText, Plus, FolderTree, ShieldAlert, Eye, ThumbsUp, Edit3, Trash2 } from 'lucide-react';

export default function WriterDashboard({ onNavigate }) {
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'React Server Components Are Changing How We Think About State',
      status: 'PUBLISHED',
      category: 'Frontend',
      views: 4120,
      likes: 312,
      updatedAt: 'Aug 18, 2026'
    },
    {
      id: '2',
      title: 'Building Resilient Microservices with Go and gRPC',
      status: 'IN REVIEW',
      category: 'Backend',
      views: 0,
      likes: 0,
      updatedAt: 'Aug 20, 2026'
    },
    {
      id: '3',
      title: 'Zero-Trust Architecture: Practical Implementation Guide',
      status: 'DRAFT',
      category: 'Security',
      views: 0,
      likes: 0,
      updatedAt: 'Aug 21, 2026'
    }
  ]);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 sm:p-6 md:p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]/40">
            Tech Writer Portal
          </span>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            Writer Dashboard
          </h1>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate?.('manage-categories')}
            className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-['JetBrains_Mono'] uppercase flex items-center gap-1.5 transition-colors"
            title="Manage Categories"
          >
            <FolderTree size={14} />
            <span className="hidden lg:inline">Categories</span>
          </button>
          <button
            onClick={() => onNavigate?.('review-queue')}
            className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-['JetBrains_Mono'] uppercase flex items-center gap-1.5 transition-colors"
            title="Review Queue"
          >
            <ShieldAlert size={14} />
            <span className="hidden lg:inline">Queue</span>
          </button>
          <button
            onClick={() => onNavigate?.('create-content')}
            className="px-4 py-2.5 bg-[#84cc16] text-black font-['JetBrains_Mono'] font-bold text-xs uppercase hover:bg-lime-400 transition-colors flex items-center gap-1.5"
          >
            <Plus size={16} />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 p-4">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[11px] font-['JetBrains_Mono'] uppercase">Total Posts</span>
            <FileText size={16} />
          </div>
          <div className="font-['Outfit'] text-2xl font-bold text-white">{posts.length}</div>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[11px] font-['JetBrains_Mono'] uppercase">Total Views</span>
            <Eye size={16} />
          </div>
          <div className="font-['Outfit'] text-2xl font-bold text-[#84cc16]">4,120</div>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[11px] font-['JetBrains_Mono'] uppercase">Total Likes</span>
            <ThumbsUp size={16} />
          </div>
          <div className="font-['Outfit'] text-2xl font-bold text-violet-400">312</div>
        </div>
      </div>

      {/* Posts Section Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-['Outfit'] text-lg font-bold text-zinc-100">Your Articles</h2>
        <span className="text-xs font-['JetBrains_Mono'] text-zinc-500">
          SHOWING ALL ({posts.length})
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border border-zinc-800 bg-zinc-950 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[11px] font-['JetBrains_Mono'] uppercase text-zinc-400">
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Category</th>
              <th className="p-4">Views / Likes</th>
              <th className="p-4">Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 font-bold text-sm text-zinc-100 max-w-xs truncate">
                  {post.title}
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 border ${
                      post.status === 'PUBLISHED'
                        ? 'bg-lime-500/10 text-[#84cc16] border-lime-500/30'
                        : post.status === 'IN REVIEW'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-xs font-['JetBrains_Mono'] text-zinc-400">
                  {post.category}
                </td>
                <td className="p-4 text-xs font-['JetBrains_Mono'] text-zinc-300">
                  {post.views} / {post.likes}
                </td>
                <td className="p-4 text-xs font-['JetBrains_Mono'] text-zinc-500">
                  {post.updatedAt}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onNavigate?.('edit-content', { id: post.id })}
                      className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
                      title="Edit Post"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-400 bg-zinc-900 border border-zinc-800 hover:border-red-500/30"
                      title="Delete Post"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-950 border border-zinc-800 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span
                className={`text-[10px] font-['JetBrains_Mono'] uppercase font-bold px-2 py-0.5 border ${
                  post.status === 'PUBLISHED'
                    ? 'bg-lime-500/10 text-[#84cc16] border-lime-500/30'
                    : post.status === 'IN REVIEW'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {post.status}
              </span>
              <span className="text-[11px] font-['JetBrains_Mono'] text-zinc-500">
                {post.updatedAt}
              </span>
            </div>

            <h3 className="font-['Outfit'] font-bold text-base text-zinc-100">
              {post.title}
            </h3>

            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-zinc-400 pt-1">
              <span>{post.category}</span>
              <span>{post.views} views • {post.likes} likes</span>
            </div>

            <div className="pt-3 border-t border-zinc-900 flex justify-end gap-2">
              <button
                onClick={() => onNavigate?.('edit-content', { id: post.id })}
                className="px-3 py-1.5 text-xs font-['JetBrains_Mono'] uppercase border border-zinc-800 text-zinc-300 flex items-center gap-1.5"
              >
                <Edit3 size={12} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1.5 text-xs font-['JetBrains_Mono'] uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center gap-1.5"
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}