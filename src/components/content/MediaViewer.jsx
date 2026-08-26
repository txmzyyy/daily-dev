import { Play } from 'lucide-react'

/**
 * MediaViewer — renders article banner, video player, or audio player
 * based on content.type. Uses aspect-ratio (not fixed px heights) so it
 * scales correctly at any card width: full-bleed on mobile, half-width
 * inside the tablet+ content-grid, or full-bleed again on ContentDetail.
 */
export default function MediaViewer({ content }) {
  if (content.type === 'video') {
    return (
      <div className="media-video">
        <div
          style={{
            width: 'clamp(44px, 12%, 56px)',
            height: 'clamp(44px, 12%, 56px)',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: 'var(--violet)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Play size={22} fill="white" color="white" />
        </div>
      </div>
    )
  }

  if (content.type === 'audio') {
    return (
      <div className="media-audio">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--violet)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Play size={18} fill="white" color="white" />
        </div>
        <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2 }}>
          <div style={{ width: '30%', height: '100%', background: 'var(--lime)', borderRadius: 2 }} />
        </div>
        <span className="mono muted" style={{ fontSize: 11, flexShrink: 0 }}>4:12</span>
      </div>
    )
  }

  // article — banner image placeholder
  return <div className="media-article-banner" />
}