import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../features/auth/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/feed');
  };

  const handleQuickRole = (role) => {
    dispatch(setUserRole(role));
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back.</h1>
          <p className="text-sm text-zinc-400 mt-1">Sign in to access your tech feed.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@company.dev"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm"
          >
            Sign in
          </button>
        </form>

        {/* Demo Quick Login from Figma Wireframe */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-2">
          <p className="text-xs font-mono text-zinc-400 font-bold uppercase">// Demo Quick Login</p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickRole('user')}
              className="bg-zinc-800 hover:bg-zinc-700 text-xs py-2 rounded-lg font-medium text-zinc-300"
            >
              User Role
            </button>
            <button
              type="button"
              onClick={() => handleQuickRole('writer')}
              className="bg-zinc-800 hover:bg-zinc-700 text-xs py-2 rounded-lg font-medium text-zinc-300"
            >
              Writer Role
            </button>
            <button
              type="button"
              onClick={() => handleQuickRole('admin')}
              className="bg-zinc-800 hover:bg-zinc-700 text-xs py-2 rounded-lg font-medium text-zinc-300"
            >
              Admin Role
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-400">
          Don't have an account? <Link to="/signup" className="text-indigo-400 hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}