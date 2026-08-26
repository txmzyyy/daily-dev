import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Plus, Bell, User, LayoutDashboard, ShieldAlert } from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useAppNavigation } from '../../context/NavigationContext.jsx'

export default function SideNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { homePath } = useAppNavigation()

  if (!user) return null

  const HomeIcon = user.role === 'writer' ? LayoutDashboard : user.role === 'admin' ? ShieldAlert : Home

  const items = [
    { icon: HomeIcon, label: user.role === 'admin' || user.role === 'writer' ? 'Dashboard' : 'Home', path: homePath },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  return (
    <nav className="side-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', marginBottom: 28 }}>
        <div style={{ width: 28, height: 28, background: 'var(--violet)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700 }}>d.</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>daily.dev</span>
      </div>

      {items.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path
        return (
          <button
            key={label}
            className={clsx('side-nav-item', active && (user.role === 'admin' ? 'admin-active' : 'active'))}
            onClick={() => navigate(path)}
          >
            <Icon size={18} /> {label}
          </button>
        )
      })}

      <button className="side-nav-item primary" style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => navigate('/post')}>
        <Plus size={18} /> New post
      </button>
    </nav>
  )
}