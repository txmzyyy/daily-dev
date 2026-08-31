import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../../components/layout/AppLayout';
import ContentCard from '../../components/content/ContentCard';
import CategoryChip from '../../components/common/CategoryChip';

import {
  loadFeed,
  loadRecommended,
  loadWishlist,
  setSelectedCategory,
  setActiveTab,
} from '../../features/content/contentSlice';

import { fetchCategories } from '../../features/categories/categorySlice';

export default function HomeFeedPage() {
  const dispatch = useDispatch();

  const {
    items,
    recommended,
    selectedCategory,
    activeTab,
    status,
    error,
  } = useSelector((state) => state.content);

  const { categories } = useSelector(
    (state) => state.categories
  );

  const token = useSelector(
    (state) => state.auth.token
  );


  useEffect(() => {
    dispatch(loadFeed());
    dispatch(fetchCategories());

    if (token) {
      dispatch(loadRecommended());
      dispatch(loadWishlist());
    }
  }, [dispatch, token]);


  let filteredItems = [...items];


  /* Category */

  if (
    selectedCategory !== 'For You' &&
    selectedCategory !== 'All'
  ) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.category?.toLowerCase() ===
        selectedCategory.toLowerCase()
    );
  }


  /* Tabs */

  if (activeTab === 'Following') {
    const recommendedIds =
      recommended.map((item) => item.id);

    filteredItems = filteredItems.filter(
      (item) =>
        recommendedIds.includes(item.id)
    );
  }


  if (activeTab === 'Trending') {
    filteredItems.sort(
      (a, b) =>
        (b.likes || 0) -
        (a.likes || 0)
    );
  }


  return (
    <AppLayout>

      {/* Tabs */}

      <div className="flex items-center gap-6 border-b border-zinc-800 pb-3 mb-4 text-sm font-semibold">

        {[
          'For You',
          'Following',
          'Trending',
        ].map((tab) => (

          <button
            key={tab}
            onClick={() =>
              dispatch(setActiveTab(tab))
            }
            className={`relative pb-3 transition ${
              activeTab === tab
                ? 'text-white font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >

            {tab}

            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400 rounded-full" />
            )}

          </button>

        ))}

      </div>


      {/* Categories */}

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">

        <CategoryChip
          label="For You"
          active={
            selectedCategory === 'For You'
          }
          onClick={() =>
            dispatch(
              setSelectedCategory('For You')
            )
          }
        />

        {categories.map((category) => (

          <CategoryChip
            key={category.id}
            label={category.name}
            active={
              selectedCategory ===
              category.name
            }
            onClick={() =>
              dispatch(
                setSelectedCategory(
                  category.name
                )
              )
            }
          />

        ))}

      </div>


      {/* Loading */}

      {status === 'loading' && (
        <div className="text-center py-12 text-sm text-zinc-500">
          Loading content...
        </div>
      )}


      {/* Error */}

      {status === 'failed' && (
        <div className="text-center py-12 text-sm text-red-400">
          {error || 'Failed to load content.'}
        </div>
      )}


      {/* Feed */}

      {status !== 'loading' && (
        <div className="space-y-4">

          {filteredItems.length > 0 ? (

            filteredItems.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
              />
            ))

          ) : (

            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">

              <p className="text-sm text-zinc-400">
                No content available for this category yet.
              </p>

            </div>

          )}

        </div>
      )}

    </AppLayout>
  );
}