import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import ContentCard from '../../components/content/ContentCard';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { items } = useSelector((state) => state.content);

  const searchResults = items.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Explore Tech Topics</h1>
          <p className="text-xs text-zinc-400">Search articles, videos, and podcasts across categories.</p>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search keywords, topics, or authors..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {searchResults.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}