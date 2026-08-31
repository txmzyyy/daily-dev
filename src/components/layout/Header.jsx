import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bell, Bookmark, Shield, PenTool } from 'lucide-react';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  const role = user?.role;

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/feed" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-lg shadow-indigo-600/30 group-hover:bg-indigo-500 transition">
            d.
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            daily<span className="text-indigo-400">.dev</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {role === 'writer' && (
            <Link
              to="/writer/create"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-600/30 transition"
            >
              <PenTool size={14} /> Create
            </Link>
          )}

          {role === 'admin' && (
            <Link
              to="/admin/dashboard"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-purple-600/20 text-purple-400 border border-purple-500/30 px-3 py-1.5 rounded-lg hover:bg-purple-600/30 transition"
            >
              <Shield size={14} /> Admin
            </Link>
          )}

          <Link to="/notifications" className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#09090b]" />
            )}
          </Link>

          <Link to="/wishlist" className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60">
            <Bookmark size={18} />
          </Link>

          <Link to="/profile" className="flex items-center gap-2 pl-1 sm:pl-2">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name || 'Profile'}
                className="w-8 h-8 rounded-full ring-2 ring-indigo-500/50 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-indigo-500/50">
                {(user?.first_name?.[0] || user?.name?.[0] || 'U').toUpperCase()}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
