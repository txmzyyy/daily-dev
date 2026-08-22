import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Plus, Bell, User, LayoutDashboard, ShieldAlert } from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../../App.jsx'
import { useNotifications } from '../../context/NotificationsContext.jsx'

/**
 * BottomNav — fixed bottom bar per the blueprint spec
 * (Home / Search / Post+ / Notifications / Profile), role-adaptive icon
 * and active-state color. Hides itself on desktop (1024px+) via CSS,
 * where SideNav takes over navigation.
 *
 * Unread state comes from NotificationsContext, shared with Header and
 * the Notifications screen.
 */
export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { hasUnread } = useNotifications()

  if (!user) return null

  const homePath = user.role === 'writer' ? '/writer/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/home'
  const HomeIcon = user.role === 'writer' ? LayoutDashboard : user.role === 'admin' ? ShieldAlert : Home
  const activeClass = user.role === 'admin' ? 'admin-active' : 'active'

  const items = [
    { icon: HomeIcon, label: 'Home', path: homePath },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Plus, label: 'Post', path: '/post', center: true },
    { icon: Bell, label: 'Alerts', path: '/notifications', badge: hasUnread },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  return (
    <nav className="bottom-nav">
      {items.map(({ icon: Icon, label, path, center, badge }) => {
        const active = location.pathname === path
        return (
          <button
            key={label}
            className={clsx('nav-item', center && 'center', !center && active && activeClass)}
            onClick={() => navigate(path)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
          >
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon size={20} />
              {badge && !center && (
                <span
                  style={{
                    position: 'absolute', top: -2, right: -3,
                    width: 7, height: 7, borderRadius: '50%',
                    background: 'var(--danger)', border: '1.5px solid var(--bg)',
                  }}
                />
              )}
            </span>
            {!center && <span>{label}</span>}
          </button>
        )
      })}
    </nav>
  )
}