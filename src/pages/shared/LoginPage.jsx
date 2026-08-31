import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        login({
          email: email.trim(),
          password,
        })
      ).unwrap();

      const user = result?.user;
      const role = user?.role;

      console.log('LOGIN SUCCESS:', user);
      console.log('USER ROLE:', role);

    
      // ADMIN
    
      if (role === 'admin') {
        navigate('/admin/dashboard');
        return;
      }

    
      // WRITER
    
      if (role === 'writer') {
        navigate('/writer/dashboard');
        return;
      }

 
      // NORMAL USER
      
      if (role === 'user') {
        navigate('/feed');
        return;
      }

      // Unknown role
      console.error('Unknown user role:', role);
      navigate('/feed');

    } catch (err) {
      console.error('LOGIN ERROR:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center items-center px-4 py-8">

      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back.
          </h1>

          <p className="text-sm text-zinc-400 mt-1">
            Sign in to access your tech feed.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Email */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Email
            </label>

            <input
              type="email"
              required
              placeholder="you@company.dev"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Password
            </label>

            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-3">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm"
          >
            {loading
              ? 'Signing in...'
              : 'Sign in'}
          </button>

        </form>

        {/* Role explanation */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">

          <p className="text-xs font-mono text-zinc-400 font-bold uppercase mb-3">
            Account access
          </p>

          <div className="space-y-2 text-xs text-zinc-400">

            <p>
              <span className="text-white font-semibold">
                User
              </span>
              {' '}→ Community feed
            </p>

            <p>
              <span className="text-white font-semibold">
                Writer
              </span>
              {' '}→ Writer dashboard + content creation
            </p>

            <p>
              <span className="text-white font-semibold">
                Admin
              </span>
              {' '}→ Full administration
            </p>

          </div>

        </div>

        {/* Signup */}
        <p className="text-center text-xs text-zinc-400">
          Don't have an account?{' '}

          <Link
            to="/signup"
            className="text-indigo-400 hover:underline"
          >
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}