
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../api/api';


export default function LandingPage() {
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState([]);
  

 useEffect(() => {
    async function loadLandingPageData() {
      try {
        const categoryData = await apiFetch('/api/categories');
        setCategories(Array.isArray(categoryData) ? categoryData : []);

        const contentData = await apiFetch('/api/content');
        setContent(Array.isArray(contentData) ? contentData : []);
      } catch (error) {
        console.error(
          'Failed to load landing page data:',
          error
        );
      }
    }

    loadLandingPageData();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between p-6">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center items-center text-center">

        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center font-black text-4xl mb-6 shadow-2xl shadow-indigo-600/40">
          d.
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          daily.dev
        </h1>

        <p className="text-lg text-zinc-300 font-medium mb-1">
          Where developers stay sharp.
        </p>

        <p className="text-sm text-zinc-500 mb-8">
          Curated content, zero noise.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-xs">
          {categories.map((category) => (
            <span
              key={category.id}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-full text-xs font-medium"
            >
              {category.name}
            </span>
          ))}
        </div>

        <div className="w-full mb-10 border-y border-zinc-800/80 py-4">
          <div>
            <p className="text-xl font-bold text-white">
              {content.length}
            </p>

            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Content available
            </p>
          </div>
        </div>

        <div className="w-full space-y-3">
          <Link
            to="/signup"
            className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/25"
          >
            Create account
          </Link>

          <Link
            to="/login"
            className="block w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 font-semibold py-3 rounded-xl transition"
          >
            Sign in
          </Link>

        </div>

      </div>
    </div>
  );
}

