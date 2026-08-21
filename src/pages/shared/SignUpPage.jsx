import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../features/auth/authSlice';

export default function SignUpPage() {
  const [role, setRole] = useState('user'); // 'user' or 'writer'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserRole(role));
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Join the community.</h1>
          <p className="text-sm text-zinc-400 mt-1">Create a free developer account.</p>
        </div>

        {/* Role Selector matching Figma Switcher */}
        <div className="bg-zinc-900 p-1 rounded-xl flex gap-1 border border-zinc-800">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition ${
              role === 'user' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Developer
          </button>
          <button
            type="button"
            onClick={() => setRole('writer')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition ${
              role === 'writer' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tech Writer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="Your full name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@company.dev"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl text-sm transition shadow-lg shadow-indigo-600/20"
          >
            Create account
          </button>
        </form>

        <div className="relative text-center my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
          <span className="relative bg-[#09090b] px-3 text-xs text-zinc-500">or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 py-2.5 rounded-xl text-xs font-semibold text-zinc-300">GitHub</button>
          <button type="button" className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 py-2.5 rounded-xl text-xs font-semibold text-zinc-300">Google</button>
        </div>

        <p className="text-center text-xs text-zinc-400">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}