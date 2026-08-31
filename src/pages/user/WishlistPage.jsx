import React, { useEffect } from 'react';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import AppLayout from '../../components/layout/AppLayout';
import ContentCard from '../../components/content/ContentCard';

import {
  loadWishlist,
} from '../../features/content/contentSlice';


export default function WishlistPage() {
  const dispatch = useDispatch();

  const {
    wishlist,
    status,
  } = useSelector(
    (state) => state.content
  );


  const token = useSelector(
    (state) => state.auth.token
  );


  useEffect(() => {
    if (token) {
      dispatch(loadWishlist());
    }
  }, [dispatch, token]);


  return (
    <AppLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-2xl font-bold text-white mb-1">
            Saved Wishlist
          </h1>

          <p className="text-xs text-zinc-400">
            Your bookmarked technical articles and media for later review.
          </p>

        </div>


        {status === 'loading' && (
          <div className="text-center py-12 text-sm text-zinc-500">
            Loading wishlist...
          </div>
        )}


        {status !== 'loading' && (
          <div className="space-y-4">

            {wishlist.length > 0 ? (

              wishlist.map(
                (item) => (
                  <ContentCard
                    key={item.id}
                    item={{
                      ...item,
                      isWishlisted: true,
                    }}
                  />
                )
              )

            ) : (

              <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">

                <p className="text-sm text-zinc-400">
                  Your wishlist is currently empty.
                </p>

              </div>

            )}

          </div>
        )}

      </div>

    </AppLayout>
  );
}