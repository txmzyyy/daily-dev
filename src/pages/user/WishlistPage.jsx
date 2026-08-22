import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import ContentCard from '../../components/content/ContentCard';
import { useSelector } from 'react-redux';

export default function WishlistPage() {
  const { items } = useSelector((state) => state.content);
  const wishlistedItems = items.filter(i => i.isWishlisted);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Saved Wishlist</h1>
          <p className="text-xs text-zinc-400">Your bookmarked technical articles and media for later review.</p>
        </div>

        <div className="space-y-4">
          {wishlistedItems.length > 0 ? (
            wishlistedItems.map(item => <ContentCard key={item.id} item={item} />)
          ) : (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-400">Your wishlist is currently empty.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}