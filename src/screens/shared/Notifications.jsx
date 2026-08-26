import { Bell, MessageCircle, Flag, CheckCircle } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import { useNotifications } from '../../context/NotificationsContext.jsx'

const ICONS = { content: Bell, reply: MessageCircle, flag: Flag, approval: CheckCircle }

/**
 * Notifications — reads from the shared NotificationsContext so the
 * unread dot on Header/BottomNav always agrees with what's shown here.
 *
 * Trigger for clearing unread state is deliberate, not automatic:
 *   - tapping an individual item marks just that one read
 *   - "Mark all read" clears everything at once
 * (Previously this fired markAllRead() on mount, which cleared the dot
 * before the person had actually looked at anything.)
 */
export default function Notifications() {
  const { items, unreadCount, markAllRead, markRead } = useNotifications()

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12 }}>
        <h1 style={{ fontSize: 24 }}>Notifications</h1>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" block={false} onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">You're all caught up.</div>
      ) : (
        items.map((n) => {
          const Icon = ICONS[n.type] || Bell
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className="card"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                border: 'none',
                padding: 0,
                opacity: n.read ? 0.6 : 1,
                cursor: n.read ? 'default' : 'pointer',
              }}
            >
              <div className="card-body" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative' }}>
                {!n.read && (
                  <span
                    style={{
                      position: 'absolute', top: 16, right: 14,
                      width: 7, height: 7, borderRadius: '50%',
                      background: 'var(--danger)',
                    }}
                  />
                )}
                <Icon size={18} color="var(--violet)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ marginBottom: 4, color: 'var(--text)' }}>{n.text}</div>
                  <div className="muted mono" style={{ fontSize: 11 }}>{n.time}</div>
                </div>
              </div>
            </button>
          )
        })
      )}
    </div>
  )
}