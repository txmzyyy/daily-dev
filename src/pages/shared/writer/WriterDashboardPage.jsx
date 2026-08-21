import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useSelector } from 'react-redux';
import { Plus, PenTool, ThumbsUp, MessageSquare } from 'lucide-react';

export default function WriterDashboardPage() {
  const { items } = useSelector((state) => state.content);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Tech Writer Portal</h1>
            <p className="text-xs text-zinc-400">Manage and publish technical insights.</p>
          </div>

          <Link
            to="/writer/create"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
          >
            <Plus size={16} /> New Article
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <p className="text-xs font-mono text-zinc-400 uppercase">Published</p>
            <p className="text-2xl font-bold text-white mt-1">{items.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <p className="text-xs font-mono text-zinc-400 uppercase">Total Likes</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">5,950</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <p className="text-xs font-mono text-zinc-400 uppercase">Comments</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">277</p>
          </div>
        </div>

        {/* Article list */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white">Your Published Posts</h3>
          </div>
          <div className="divide-y divide-zinc-800">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">{item.category} • {item.date}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1"><ThumbsUp size={12} /> {item.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {item.commentsCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}