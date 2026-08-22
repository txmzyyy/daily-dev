import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import ContentCard from '../../components/content/ContentCard';
import CategoryChip from '../../components/common/CategoryChip';
import { setSelectedCategory, setActiveTab } from '../../features/content/contentSlice';

export default function HomeFeedPage() {
  const dispatch = useDispatch();
  const { items, selectedCategory, activeTab } = useSelector((state) => state.content);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);

  let filteredItems = items.filter(item => {
    if (selectedCategory === 'For You' || selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  if (activeTab === 'Following') {
    filteredItems = filteredItems.filter(item =>
      user?.subscribedCategories?.some(c => c.toLowerCase() === item.category.toLowerCase())
    );
  } else if (activeTab === 'Trending') {
    filteredItems = [...filteredItems].sort((a, b) => b.likes - a.likes);
  }

  return (
    <AppLayout>
      {/* Top Tabs matching Figma Wireframe */}
      <div className="flex items-center gap-6 border-b border-zinc-800 pb-3 mb-4 text-sm font-semibold">
        {['For You', 'Following', 'Trending'].map((tab) => (
          <button
            key={tab}
            onClick={() => dispatch(setActiveTab(tab))}
            className={`relative pb-3 transition ${
              activeTab === tab ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Category Pills Slider matching Figma */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
        {['For You', ...categories].map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => dispatch(setSelectedCategory(cat))}
          />
        ))}
      </div>

      {/* Main Feed Content List */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-400">No content available for this category yet.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}