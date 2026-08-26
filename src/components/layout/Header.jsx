import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNotifications } from '../../context/NotificationsContext.jsx'

/**
 * Header
 *
 * Sticky top bar shown on mobile/tablet (< 1024px) with the daily.dev
 * logo, a notifications shortcut (with unread dot), and a profile avatar.
 * Hides itself on desktop via CSS since SideNav already surfaces
 * Notifications/Profile as nav items — avoids duplicating the same links
 * in two places on wider screens.
 *
 * Unread state comes from NotificationsContext, shared with BottomNav and
 * the Notifications screen — no more independently-guessed booleans.
 */
export default function Header() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { hasUnread } = useNotifications()

  if (!user) return null

  const homePath = user.role === 'writer' ? '/writer/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/home'

  return (
    <header className="app-header">
      <button className="app-header-logo" onClick={() => navigate(homePath)} aria-label="Go home">
        <span className="app-header-badge">d.</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>daily.dev</span>
      </button>

      <div className="app-header-actions">
        <button
          className="app-header-icon-btn"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <Bell size={16} />
          {hasUnread && <span className="app-header-dot" />}
        </button>
        <button
          className="app-header-avatar"
          onClick={() => navigate('/profile')}
          aria-label="Profile"
        />
      </div>
    </header>
  )
}