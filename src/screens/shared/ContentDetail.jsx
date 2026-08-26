import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, ThumbsDown, MessageCircle, Share2, Bookmark } from 'lucide-react'
import clsx from 'clsx'
import MediaViewer from '../../components/content/MediaViewer.jsx'
import CommentThread from '../../components/content/CommentThread.jsx'
import { MOCK_CONTENT } from '../../data/mockContent.js'

export default function ContentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const content = MOCK_CONTENT.find((c) => String(c.id) === id) || MOCK_CONTENT[0]
  const [saved, setSaved] = useState(false)
  const [reaction, setReaction] = useState(null) // 'like' | 'dislike' | null
  const [showShare, setShowShare] = useState(false)

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        <ArrowLeft size={18} />
      </button>

      <MediaViewer content={content} />

      <span className={clsx('tag', 'tag-violet')} style={{ marginTop: 16, display: 'inline-block' }}>{content.category}</span>
      <h1 style={{ fontSize: 24, margin: '10px 0' }}>{content.title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-2)' }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{content.author}</div>
          <div className="muted mono" style={{ fontSize: 11 }}>{content.date} · {content.readTime}</div>
        </div>
      </div>

      <p className="muted" style={{ lineHeight: 1.6, marginBottom: 24, maxWidth: '65ch' }}>{content.description}</p>

      <div className="action-row" style={{ marginBottom: 28, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
        <button className="btn-icon btn-secondary" onClick={() => setReaction(reaction === 'like' ? null : 'like')} style={{ color: reaction === 'like' ? 'var(--lime)' : 'var(--text)' }}>
          <Heart size={18} fill={reaction === 'like' ? 'var(--lime)' : 'none'} />
        </button>
        <button className="btn-icon btn-secondary" onClick={() => setReaction(reaction === 'dislike' ? null : 'dislike')} style={{ color: reaction === 'dislike' ? 'var(--danger)' : 'var(--text)' }}>
          <ThumbsDown size={18} />
        </button>
        <button className="btn-icon btn-secondary">
          <MessageCircle size={18} />
        </button>
        <button className="btn-icon btn-secondary" onClick={() => setSaved(!saved)} style={{ color: saved ? 'var(--violet)' : 'var(--text)' }}>
          <Bookmark size={18} fill={saved ? 'var(--violet)' : 'none'} />
        </button>
        <button className="btn-icon btn-secondary" onClick={() => setShowShare(true)} style={{ marginLeft: 'auto' }}>
          <Share2 size={18} />
        </button>
      </div>

      <CommentThread contentId={content.id} />

      {showShare && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end' }} onClick={() => setShowShare(false)}>
          <div className="card" style={{ width: '100%', maxWidth: 480, margin: '0 auto', borderRadius: '16px 16px 0 0' }} onClick={(e) => e.stopPropagation()}>
            <div className="card-body">
              <h3 style={{ marginBottom: 16 }}>Share</h3>
              <button className="btn btn-secondary" style={{ marginBottom: 8 }}>Copy link</button>
              <button className="btn btn-secondary" style={{ marginBottom: 8 }}>Share to socials</button>
              <button className="btn btn-secondary">Recommend to a followed user</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}