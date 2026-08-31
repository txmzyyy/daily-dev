
import React, {
  useState,
  useEffect,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  MessageSquare,
  ThumbsUp,
  Trash2,
} from 'lucide-react';

import {
  loadComments,
  submitComment,
} from '../../features/content/contentSlice';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000';


/*COMMENT COMPONENT*/

function Comment({
  comment,
  contentId,
  currentUser,
  onCommentDeleted,
}) {
  const [replying, setReplying] =
    useState(false);

  const [replyText, setReplyText] =
    useState('');

  const [deleting, setDeleting] =
    useState(false);

  const dispatch = useDispatch();

  const token =
    useSelector(
      (state) => state.auth.token
    ) ||
    localStorage.getItem('token');


  /* REPLY */

  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      return;
    }

    if (!token) {
      alert(
        'Please log in to reply.'
      );
      return;
    }

    dispatch(
      submitComment({
        content_id: contentId,
        text: replyText,
        parent_comment_id:
          comment.id,
      })
    );

    setReplyText('');
    setReplying(false);
  };


  /*CHECK COMMENT OWNER*/

  const commentUserId =
    comment.user_id ??
    comment.userId ??
    comment.user?.id;

  const currentUserId =
    currentUser?.id;


  const isOwner =
    currentUserId &&
    commentUserId &&
    Number(currentUserId) ===
      Number(commentUserId);


  const isAdmin =
    currentUser?.role === 'admin';


  /*DELETE PERMISSION*/

  const canDelete =
    isOwner || isAdmin;


  /*DELETE COMMENT*/

  const handleDelete = async () => {
    if (!token) {
      alert(
        'Please log in to delete comments.'
      );
      return;
    }

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this comment? This action cannot be undone.'
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `${BASE_URL}/api/comments/${comment.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to delete comment'
        );
      }

     

      if (onCommentDeleted) {
        onCommentDeleted();
      }

    } catch (err) {
      console.error(
        'Delete comment error:',
        err
      );

      alert(
        err.message ||
        'Failed to delete comment.'
      );
    } finally {
      setDeleting(false);
    }
  };


  /* RENDER*/

  return (
    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/60">

      {/* USER + DATE */}

      <div className="flex items-center gap-2 mb-2">

        <span className="text-xs font-bold text-zinc-200">

          {comment.user ||
            comment.username ||
            comment.user?.name ||
            'User'}

        </span>

        {comment.created_at && (
          <span className="text-[10px] text-zinc-500">

            {new Date(
              comment.created_at
            ).toLocaleString()}

          </span>
        )}

      </div>


      {/* COMMENT TEXT */}

      <p className="text-xs text-zinc-300 leading-relaxed">
        {comment.text}
      </p>


      {/* ACTIONS */}

      <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">

        {/* LIKE */}

        <button
          type="button"
          className="flex items-center gap-1 hover:text-white"
        >
          <ThumbsUp size={12} />

          {comment.likes || 0}

        </button>


        {/* REPLY */}

        <button
          type="button"
          className="flex items-center gap-1 hover:text-white"
          onClick={() =>
            setReplying(
              (value) => !value
            )
          }
        >

          <MessageSquare size={12} />

          Reply

        </button>


        {/* DELETE */}

        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 disabled:opacity-50"
          >

            <Trash2 size={12} />

            {deleting
              ? 'Deleting...'
              : 'Delete'}

          </button>
        )}

      </div>


      {/* REPLY FORM */}

      {replying && (
        <div className="mt-3 flex gap-2">

          <textarea
            rows={2}
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) =>
              setReplyText(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />

          <button
            type="button"
            onClick={handleReplySubmit}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg text-xs font-semibold self-start"
          >
            Post
          </button>

        </div>
      )}


      {/* REPLIES */}

      {comment.replies &&
        comment.replies.length > 0 && (

          <div className="ml-6 mt-3 pl-3 border-l-2 border-zinc-700/50 space-y-3">

            {comment.replies.map(
              (reply) => (

                <Comment
                  key={reply.id}
                  comment={reply}
                  contentId={contentId}
                  currentUser={currentUser}
                  onCommentDeleted={
                    onCommentDeleted
                  }
                />

              )
            )}

          </div>

        )}

    </div>
  );
}


/*COMMENT THREAD*/

export default function CommentThread({
  contentId,
  currentUser,
}) {
  const dispatch = useDispatch();

  const comments = useSelector(
    (state) =>
      state.content.comments || []
  );

  const [newComment, setNewComment] =
    useState('');


  /*LOAD COMMENTS */

  useEffect(() => {
    if (contentId) {
      dispatch(
        loadComments(contentId)
      );
    }
  }, [
    contentId,
    dispatch,
  ]);


  /*POST COMMENT*/

  const handlePost = () => {
    if (!newComment.trim()) {
      return;
    }

    const token =
      localStorage.getItem('token');

    if (!token) {
      alert(
        'Please log in to comment.'
      );
      return;
    }

    dispatch(
      submitComment({
        content_id: contentId,
        text: newComment,
      })
    );

    setNewComment('');
  };


  /*RELOAD AFTER DELETE*/

  const handleCommentDeleted = () => {
    dispatch(
      loadComments(contentId)
    );
  };


  /*RENDER*/

  return (
    <div className="mt-8 space-y-6">

      <h3 className="text-lg font-bold text-white">
        Discussion
      </h3>


      {/* NEW COMMENT */}

      <div className="flex gap-3">

        <textarea
          rows={3}
          placeholder="Share your technical context or thoughts..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          value={newComment}
          onChange={(e) =>
            setNewComment(
              e.target.value
            )
          }
        />

      </div>


      <div className="flex justify-end">

        <button
          type="button"
          onClick={handlePost}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold"
        >
          Post Comment
        </button>

      </div>


      {/* COMMENTS */}

      <div className="space-y-4 pt-4 border-t border-zinc-800">

        {comments.length === 0 && (
          <p className="text-xs text-zinc-500 text-center">
            No comments yet — be the first.
          </p>
        )}

        {comments.map(
          (comment) => (

            <Comment
              key={comment.id}
              comment={comment}
              contentId={contentId}
              currentUser={currentUser}
              onCommentDeleted={
                handleCommentDeleted
              }
            />

          )
        )}

      </div>

    </div>
  );
}
