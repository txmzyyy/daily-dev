
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AppLayout from '../../components/layout/AppLayout';
import MediaViewer from '../../components/content/MediaViewer';
import CommentThread from '../../components/content/CommentThread';

import {
  loadContentById,
  loadWishlist,
  toggleLike,
  toggleWishlist,
} from '../../features/content/contentSlice';

import {
  ArrowLeft,
  ThumbsUp,
  Bookmark,
  Trash2,
} from 'lucide-react';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000';

export default function ContentDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const current = useSelector(
    (state) => state.content.current
  );

  const wishlistIds = useSelector(
    (state) => state.content.wishlistIds || []
  );

  const status = useSelector(
    (state) => state.content.status
  );

  const error = useSelector(
    (state) => state.content.error
  );

  const token = useSelector(
    (state) => state.auth.token
  ) || localStorage.getItem('token');

  const [currentUser, setCurrentUser] = useState(null);
  const [deleting, setDeleting] = useState(false);


  // LOAD CONTENT
 
  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(loadContentById(id));
  }, [dispatch, id]);

  // LOAD WISHLIST
  

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(loadWishlist());
  }, [dispatch, token]);

  
  //LOAD LOGGED-IN USER
  

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (!token) {
        setCurrentUser(null);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            data.error ||
            'Failed to load current user'
          );
        }

        setCurrentUser(data.user);
      } catch (err) {
        console.error(
          'Failed to load current user:',
          err
        );
        setCurrentUser(null);
      }
    };

    loadCurrentUser();
  }, [token]);

  // DELETE CONTENT
 

  const handleDeleteContent = async () => {
    if (!token || !current) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `${BASE_URL}/api/content/${current.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to delete post'
        );
      }

      alert('Post deleted successfully.');

      navigate('/feed');
    } catch (err) {
      console.error(
        'Delete content error:',
        err
      );

      alert(
        err.message ||
        'Failed to delete post.'
      );
    } finally {
      setDeleting(false);
    }
  };

//LOADING
 

  if (status === 'loading' && !current) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center py-20">
          <p className="text-zinc-400">
            Loading content...
          </p>
        </div>
      </AppLayout>
    );
  }


//ERROR
  

  if (status === 'failed' && !current) {
    return (
      <AppLayout>
        <div className="text-center py-20">

          <p className="text-red-400 mb-4">
            {error ||
              'Failed to load content.'}
          </p>

          <Link
            to="/feed"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Back to Feed
          </Link>

        </div>
      </AppLayout>
    );
  }

 
  // CONTENT NOT FOUND
  if (!current) {
    return (
      <AppLayout>
        <div className="text-center py-20">

          <p className="text-zinc-400 mb-4">
            Content not found.
          </p>

          <Link
            to="/feed"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Back to Feed
          </Link>

        </div>
      </AppLayout>
    );
  }

//PERMISSIONS
  

  const isAdmin =
    currentUser?.role === 'admin';

  const isWriter =
    currentUser?.role === 'writer';

  const canDeletePost =
    isAdmin || isWriter;

  
// WISHLIST STATUS
 

  const isWishlisted =
    wishlistIds.includes(current.id);

  
 // PAGE
  

  return (
    <AppLayout>

      <div className="space-y-6">

        {/* BACK TO FEED */}

        <Link
          to="/feed"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Feed
        </Link>


        {/* HEADER */}

        <div>

          {/* Category + Date */}

          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 mb-2">

            <span>
              {current.category ||
                'Technology'}
            </span>

            <span>•</span>

            <span className="text-zinc-400">
              {current.date || ''}
            </span>

          </div>


          {/* Title */}

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
            {current.title ||
              'Untitled'}
          </h1>


          {/* Author + Actions */}

          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">

            {/* AUTHOR */}

            <div className="flex items-center gap-3">

              {current.author?.avatar ? (

                <img
                  src={current.author.avatar}
                  alt={
                    current.author.name ||
                    'Author'
                  }
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-700"
                />

              ) : (

                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">

                  {current.author?.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    'U'}

                </div>

              )}

              <div>

                <p className="text-sm font-bold text-white">
                  {current.author?.name ||
                    'Unknown Author'}
                </p>

                <p className="text-xs text-zinc-400">
                  {current.author?.role ||
                    'Contributor'}
                </p>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="flex items-center gap-2 text-zinc-400">

              {/* LIKE */}

              <button
                type="button"
                onClick={() => {

                  if (!token) {
                    alert(
                      'Please log in to like content.'
                    );
                    return;
                  }

                  dispatch(
                    toggleLike(current.id)
                  );
                }}
                className="flex items-center gap-1.5 hover:text-white text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg"
              >

                <ThumbsUp size={14} />

                <span>
                  {current.likes || 0}
                </span>

              </button>


              {/* WISHLIST */}

              <button
                type="button"
                onClick={() => {

                  if (!token) {
                    alert(
                      'Please log in to save content.'
                    );
                    return;
                  }

                  dispatch(
                    toggleWishlist(current.id)
                  );
                }}
                className={`p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white ${
                  isWishlisted
                    ? 'text-indigo-400'
                    : ''
                }`}
              >

                <Bookmark
                  size={14}
                  className={
                    isWishlisted
                      ? 'fill-indigo-400'
                      : ''
                  }
                />

              </button>


              {/* DELETE POST */}

              {canDeletePost && (
                <button
                  type="button"
                  onClick={handleDeleteContent}
                  disabled={deleting}
                  className="flex items-center gap-1.5 bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                  title="Delete Post"
                >

                  <Trash2 size={14} />

                  {deleting
                    ? 'Deleting...'
                    : 'Delete'}

                </button>
              )}

            </div>

          </div>

        </div>


        {/* CONTENT / MEDIA */}

        <MediaViewer
          item={current}
        />


        {/* COMMENTS */}

        <CommentThread
          contentId={current.id}
          currentUser={currentUser}
        />

      </div>

    </AppLayout>
  );
}

