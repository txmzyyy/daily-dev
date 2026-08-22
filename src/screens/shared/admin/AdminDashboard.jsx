import { useNavigate } from 'react-router-dom'
import { Users, FileText, Flag } from 'lucide-react'

const STATS = [
  { label: 'Users', value: '4,281', icon: Users, path: '/admin/users' },
  { label: 'Content', value: '9,730', icon: FileText, path: '/admin/moderation' },
  { label: 'Flags pending', value: '12', icon: Flag, path: '/admin/moderation' },
]

const ACTIVITY = [
  { id: 1, text: 'New user signup: alex_writer', time: '12m ago' },
  { id: 2, text: 'Content flagged: "Top 10 JS Tricks"', time: '45m ago' },
  { id: 3, text: 'Category created: WebAssembly', time: '2h ago' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Admin Dashboard</h1>

      <div className="stat-list" style={{ marginBottom: 24 }}>
        {STATS.map(({ label, value, icon: Icon, path }) => (
          <div key={label} className="card" style={{ cursor: 'pointer', marginBottom: 0 }} onClick={() => navigate(path)}>
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--violet-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color="var(--violet)" />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
                <div className="muted mono" style={{ fontSize: 11 }}>{label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="action-row" style={{ marginBottom: 24 }}>
        <button className="btn btn-secondary" style={{ width: 'auto', flex: '1 1 140px' }} onClick={() => navigate('/admin/categories')}>Categories</button>
        <button className="btn btn-secondary" style={{ width: 'auto', flex: '1 1 140px' }} onClick={() => navigate('/admin/users')}>Manage users</button>
      </div>

      <p className="mono muted" style={{ marginBottom: 10 }}>Recent activity</p>
      <div className="stack-grid">
        {ACTIVITY.map((a) => (
          <div key={a.id} className="card">
            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14 }}>{a.text}</span>
              <span className="muted mono" style={{ fontSize: 11 }}>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}