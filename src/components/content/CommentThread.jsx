import { useState } from 'react'
import { ChevronUp, ChevronDown, CornerDownRight } from 'lucide-react'
import Button from '../common/Button.jsx'
import { MOCK_COMMENTS } from '../../data/mockContent.js'

/**
 * CommentThread — nested/threaded comments with upvote/downvote/reply.
 * Indentation is capped and responsive via the `.comment-row[data-depth]`
 * rules in style.css (tighter on mobile, roomier on tablet+), so deep
 * nesting never pushes content off-screen on a 375px viewport.
 */
function CommentRow({ comment, depth = 0 }) {
  const [votes, setVotes] = useState(comment.votes)
  const [voted, setVoted] = useState(null) // 'up' | 'down' | null
  const [replying, setReplying] = useState(false)
  const [replyText, setReplyText] = useState('')

  const vote = (dir) => {
    if (voted === dir) {
      setVotes(comment.votes)
      setVoted(null)
    } else {
      setVotes(comment.votes + (dir === 'up' ? 1 : -1) - (voted === 'up' ? 1 : voted === 'down' ? -1 : 0))
      setVoted(dir)
    }
  }

  const submitReply = () => {
    setReplying(false)
    setReplyText('')
    // wire up to real submission once a backend/mock store exists
  }

  return (
    <div className="comment-row" data-depth={Math.min(depth, 3)}>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface-2)', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{comment.author}</span>
            <span className="mono muted" style={{ fontSize: 11 }}>{comment.time}</span>
          </div>
          <p style={{ margin: '0 0 6px', fontSize: 14, wordBreak: 'break-word' }}>{comment.text}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="btn-icon"
              style={{ padding: 2, background: 'none', border: 'none', color: voted === 'up' ? 'var(--lime)' : 'var(--muted)' }}
              onClick={() => vote('up')}
              aria-label="Upvote"
            >
              <ChevronUp size={16} />
            </button>
            <span className="mono muted" style={{ fontSize: 12 }}>{votes}</span>
            <button
              className="btn-icon"
              style={{ padding: 2, background: 'none', border: 'none', color: voted === 'down' ? 'var(--danger)' : 'var(--muted)' }}
              onClick={() => vote('down')}
              aria-label="Downvote"
            >
              <ChevronDown size={16} />
            </button>
            <button
              style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
              onClick={() => setReplying(!replying)}
            >
              <CornerDownRight size={13} /> Reply
            </button>
          </div>

          {replying && (
            <div className="comment-reply-row">
              <input
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Button size="sm" block={false} onClick={submitReply} disabled={!replyText.trim()}>
                Post
              </Button>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentRow key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function CommentThread({ contentId }) {
  const comments = MOCK_COMMENTS[contentId] || MOCK_COMMENTS.default
  const [newComment, setNewComment] = useState('')

  return (
    <div>
      <h3 style={{ fontSize: 16, marginBottom: 16 }}>{comments.length} Comments</h3>

      <div className="comment-reply-row" style={{ marginBottom: 20 }}>
        <input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button block={false} disabled={!newComment.trim()} onClick={() => setNewComment('')}>
          Post
        </Button>
      </div>

      {comments.map((c) => (
        <CommentRow key={c.id} comment={c} />
      ))}
    </div>
  )
}