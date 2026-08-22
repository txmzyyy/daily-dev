import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Check, XCircle } from 'lucide-react'

const INITIAL_FLAGS = [
  { id: 1, title: 'Top 10 JS Tricks You Didn\u2019t Know', reason: 'Spam', reporter: 'jane_dev' },
  { id: 2, title: 'Why TypeScript is Overrated', reason: 'Guideline violation', reporter: 'ops_alex' },
]

export default function ContentModerationQueue() {
  const navigate = useNavigate()
  const [flags, setFlags] = useState(INITIAL_FLAGS)

  const resolve = (id) => setFlags(flags.filter((f) => f.id !== id))

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Content Moderation Queue</h1>

      {flags.length === 0 ? (
        <div className="empty-state">No flagged content.</div>
      ) : (
        <div className="stack-grid">
          {flags.map((f) => (
            <div key={f.id} className="card">
              <div className="card-body">
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
                <div className="muted" style={{ fontSize: 13, marginBottom: 4 }}>
                  Flagged for <span className="tag tag-danger">{f.reason}</span>
                </div>
                <div className="muted mono" style={{ fontSize: 11, marginBottom: 12 }}>Reported by {f.reporter}</div>
                <div className="action-row">
                  <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => resolve(f.id)}>
                    <Check size={14} /> Approve
                  </button>
                  <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => resolve(f.id)}>
                    <XCircle size={14} /> Dismiss flag
                  </button>
                  <button className="btn btn-danger" style={{ width: 'auto', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => resolve(f.id)}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}