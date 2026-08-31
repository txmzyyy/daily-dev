
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadFeed,
} from '../../features/content/contentSlice';
import {
  Plus,
  ThumbsUp,
  MessageSquare,
  FileText,
  Clock,
} from 'lucide-react';

export default function WriterDashboardPage() {
  const dispatch = useDispatch();

  const {
    items,
    status,
    error,
  } = useSelector((state) => state.content);

  const user = useSelector(
    (state) => state.auth?.user
  );
  useEffect(() => {
    dispatch(loadFeed());
  }, [dispatch]);

  const writerPosts = useMemo(() => {
    if (!user?.id) {
      return [];
    }

    return items.filter(
      (item) =>
        Number(item.author_id) ===
        Number(user.id)
    );
  }, [items, user?.id]);

  const statistics = useMemo(() => {
    const publishedPosts =
      writerPosts.filter(
        (item) =>
          !item.status ||
          item.status === 'published' ||
          item.status === 'approved'
      );

    const pendingPosts =
      writerPosts.filter(
        (item) =>
          item.status === 'pending'
      );

    const totalLikes =
      writerPosts.reduce(
        (total, item) =>
          total + Number(item.likes || 0),
        0
      );

    const totalComments =
      writerPosts.reduce(
        (total, item) =>
          total +
          Number(item.commentsCount || 0),
        0
      );

    return {
      published: publishedPosts.length,
      pending: pendingPosts.length,
      likes: totalLikes,
      comments: totalComments,
    };
  }, [writerPosts]);

  return (
    <AppLayout>
      <div className="space-y-6">

        {/*HEADER*/}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-white">
              Writer Dashboard
            </h1>

            <p className="text-xs text-zinc-400 mt-1">
              {user
                ? `Welcome back, ${user.first_name}. Manage your technical content.`
                : 'Manage and publish technical insights.'}
            </p>
          </div>

          <Link
            to="/writer/create"
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition"
          >
            <Plus size={16} />
            New Article
          </Link>

        </div>


        {/* NO USER*/}

        {!user && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">
              Unable to identify the logged-in writer.
              Please log in again.
            </p>
          </div>
        )}


        {/*ERROR*/}

        {error && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}


        {/*STATS*/}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Published */}

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">

            <div className="flex items-center justify-between">

              <p className="text-xs font-mono text-zinc-400 uppercase">
                Published
              </p>

              <FileText
                size={16}
                className="text-indigo-400"
              />

            </div>

            <p className="text-2xl font-bold text-white mt-2">
              {statistics.published}
            </p>

          </div>


          {/* Pending */}

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">

            <div className="flex items-center justify-between">

              <p className="text-xs font-mono text-zinc-400 uppercase">
                Pending
              </p>

              <Clock
                size={16}
                className="text-amber-400"
              />

            </div>

            <p className="text-2xl font-bold text-amber-400 mt-2">
              {statistics.pending}
            </p>

          </div>


          {/* Likes */}

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">

            <div className="flex items-center justify-between">

              <p className="text-xs font-mono text-zinc-400 uppercase">
                Total Likes
              </p>

              <ThumbsUp
                size={16}
                className="text-emerald-400"
              />

            </div>

            <p className="text-2xl font-bold text-emerald-400 mt-2">
              {statistics.likes}
            </p>

          </div>


          {/* Comments */}

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">

            <div className="flex items-center justify-between">

              <p className="text-xs font-mono text-zinc-400 uppercase">
                Comments
              </p>

              <MessageSquare
                size={16}
                className="text-indigo-400"
              />

            </div>

            <p className="text-2xl font-bold text-indigo-400 mt-2">
              {statistics.comments}
            </p>

          </div>

        </div>


        {/*POSTS*/}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

          <div className="p-4 border-b border-zinc-800">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-sm font-bold text-white">
                  Your Posts
                </h3>

                <p className="text-xs text-zinc-500 mt-1">
                  Content created by your account.
                </p>
              </div>

              <span className="text-xs text-zinc-500 font-mono">
                {writerPosts.length} posts
              </span>

            </div>

          </div>


          {/* Loading */}

          {status === 'loading' && (
            <div className="text-center py-12 text-zinc-500">
              Loading your posts...
            </div>
          )}


          {/* Empty */}

          {status !== 'loading' &&
            writerPosts.length === 0 && (

              <div className="text-center py-16">

                <FileText
                  size={32}
                  className="mx-auto text-zinc-700 mb-3"
                />

                <p className="text-sm text-zinc-400">
                  You haven't created any posts yet.
                </p>

                <Link
                  to="/writer/create"
                  className="inline-flex items-center gap-1.5 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold"
                >
                  <Plus size={14} />
                  Create your first post
                </Link>

              </div>

            )}


          {/* Posts */}

          {status !== 'loading' &&
            writerPosts.length > 0 && (

              <div className="divide-y divide-zinc-800">

                {writerPosts.map((item) => (

                  <div
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >

                    <div className="min-w-0">

                      <p className="text-sm font-bold text-white truncate">
                        {item.title}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-1">

                        <span className="text-xs text-zinc-400 font-mono">
                          {item.category}
                        </span>

                        <span className="text-zinc-700">
                          •
                        </span>

                        <span className="text-xs text-zinc-500">
                          {item.date}
                        </span>

                        {item.status && (
                          <>
                            <span className="text-zinc-700">
                              •
                            </span>

                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                item.status === 'published' ||
                                item.status === 'approved'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : item.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : 'bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              {item.status}
                            </span>
                          </>
                        )}

                      </div>

                    </div>


                    <div className="flex items-center gap-4 text-xs text-zinc-400 shrink-0">

                      <span className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        {item.likes}
                      </span>

                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        {item.commentsCount}
                      </span>

                      <Link
                        to={`/content/${item.id}`}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        View
                      </Link>

                    </div>

                  </div>

                ))}

              </div>

            )}

        </div>

      </div>
    </AppLayout>
  );
}

