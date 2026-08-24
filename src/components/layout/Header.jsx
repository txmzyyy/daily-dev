import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, Bookmark, User, Shield, PenTool, LogOut } from 'lucide-react';
import { setUserRole } from '../../features/auth/authSlice';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo matching Figma */}
        <Link to="/feed" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-lg shadow-indigo-600/30 group-hover:bg-indigo-500 transition">
            d.
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            daily<span className="text-indigo-400">.dev</span>
          </span>
        </Link>

        {/* Quick Role Switcher for Demo */}
        <div className="hidden sm:flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs">
          <button 
            onClick={() => dispatch(setUserRole('user'))}
            className={`px-2.5 py-1 rounded ${user?.role === 'user' ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400'}`}
          >
            User
          </button>
          <button 
            onClick={() => dispatch(setUserRole('writer'))}
            className={`px-2.5 py-1 rounded ${user?.role === 'writer' ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400'}`}
          >
            Writer
          </button>
          <button 
            onClick={() => dispatch(setUserRole('admin'))}
            className={`px-2.5 py-1 rounded ${user?.role === 'admin' ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400'}`}
          >
            Admin
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          {user?.role === 'writer' && (
            <Link to="/writer/create" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-600/30 transition">
              <PenTool size={14} /> Create
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-purple-600/20 text-purple-400 border border-purple-500/30 px-3 py-1.5 rounded-lg hover:bg-purple-600/30 transition">
              <Shield size={14} /> Admin
            </Link>
          )}

          <Link to="/notifications" className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#09090b]"></span>
            )}
          </Link>

          <Link to="/wishlist" className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60">
            <Bookmark size={18} />
          </Link>

          <Link to="/profile" className="flex items-center gap-2 pl-2">
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full ring-2 ring-indigo-500/50 object-cover" />
          </Link>
        </div>
      </div>
    </header>
  );
}