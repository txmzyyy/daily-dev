import { useNavigate } from 'react-router-dom'
import { FileText, Video, Headphones } from 'lucide-react'

const TYPE_ICON = { article: FileText, video: Video, audio: Headphones }

/**
 * ContentCard — thumbnail, type/read-time badges, category tag, title,
 * description. Designed to sit inside `.content-grid`: full-width stacked
 * on mobile, one of two equal columns on tablet+. The thumbnail uses
 * aspect-ratio so it stays proportional at either width, and the title
 * uses clamp() so font size eases down slightly on very narrow columns
 * without needing a separate breakpoint.
 */
export default function ContentCard({ content }) {
  const navigate = useNavigate()
  const Icon = TYPE_ICON[content.type] || FileText

  return (
    <div className="card" onClick={() => navigate(`/content/${content.id}`)} style={{ cursor: 'pointer' }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--surface-2)' }}>
        <span
          className="mono"
          style={{
            position: 'absolute', top: 10, left: 10,
            background: 'rgba(10,10,12,0.8)', padding: '4px 8px', borderRadius: 6,
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          <Icon size={12} /> {content.type}
        </span>
        {content.readTime && (
          <span
            className="mono"
            style={{
              position: 'absolute', bottom: 10, right: 10,
              background: 'rgba(10,10,12,0.8)', padding: '4px 8px', borderRadius: 6,
            }}
          >
            {content.readTime}
          </span>
          )}
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="tag tag-lime">{content.category}</span>
          <span className="muted mono" style={{ fontSize: 11 }}>{content.date}</span>
        </div>
        <h3 style={{ fontSize: 'clamp(14px, 2.2vw, 16px)', marginBottom: 6, lineHeight: 1.3 }}>{content.title}</h3>
        <p className="muted" style={{ fontSize: 13, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {content.description}
        </p>
      </div>
    </div>
  )
}