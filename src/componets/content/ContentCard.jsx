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