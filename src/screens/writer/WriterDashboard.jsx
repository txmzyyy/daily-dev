import { useNavigate } from 'react-router-dom'
import { Eye, Heart, MessageCircle, Plus } from 'lucide-react'

const STATS = [
  { label: 'Views', value: '12.4k', icon: Eye },
  { label: 'Likes', value: '892', icon: Heart },
  { label: 'Comments', value: '146', icon: MessageCircle },
]

const DRAFTS = [
  { id: 1, title: 'Understanding Suspense Boundaries', status: 'draft' },
  { id: 2, title: 'A Guide to Edge Functions', status: 'pending' },
  { id: 3, title: 'React Server Components Are Changing...', status: 'published' },
]

const STATUS_TAG = { draft: 'tag-danger', pending: 'tag-violet', published: 'tag-lime' }

export default function WriterDashboard() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>Writer Dashboard</h1>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => navigate('/writer/create')}>
          <Plus size={16} /> New
        </button>
      </div>

      <div className="stat-list" style={{ marginBottom: 24 }}>
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card" style={{ marginBottom: 0 }}>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <Icon size={16} color="var(--violet)" style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
              <div className="muted mono" style={{ fontSize: 10 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <p className="mono muted">Your content</p>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/writer/review-queue') }} style={{ color: 'var(--lime)', fontSize: 13 }}>Review queue →</a>
      </div>

      <div className="stack-grid">
        {DRAFTS.map((d) => (
          <div key={d.id} className="card" onClick={() => navigate('/writer/create')} style={{ cursor: 'pointer' }}>
            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{d.title}</span>
              <span className={`tag ${STATUS_TAG[d.status]}`}>{d.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}