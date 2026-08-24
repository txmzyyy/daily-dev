import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}