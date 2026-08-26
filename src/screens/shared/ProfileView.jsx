import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ProfileView() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>Profile</h1>
        <button className="btn-icon btn-secondary" onClick={() => navigate('/profile/edit')}>
          <Settings size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--surface-2)', marginBottom: 12 }} />
        <h2 style={{ fontSize: 20 }}>{user?.name || 'Demo User'}</h2>
        <span className="mono muted" style={{ fontSize: 11, textTransform: 'uppercase' }}>{user?.role || 'user'}</span>
        <p className="muted" style={{ textAlign: 'center', marginTop: 10, maxWidth: '40ch' }}>
          Senior engineer. Loves distributed systems and coffee.
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <p className="mono muted" style={{ marginBottom: 10 }}>Subscribed categories</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Frontend', 'DevOps', 'Data / ML'].map((c) => (
            <span key={c} className="tag tag-violet">{c}</span>
          ))}
        </div>
      </div>

      <p className="mono muted" style={{ marginBottom: 10 }}>Posted content</p>
      <div className="empty-state" style={{ padding: '30px 0' }}>Nothing posted yet.</div>
    </div>
  )
}