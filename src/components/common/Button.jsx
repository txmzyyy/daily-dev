import React from 'react';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700",
    outline: "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}