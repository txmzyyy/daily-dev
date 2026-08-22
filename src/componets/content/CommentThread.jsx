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