import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Flag } from 'lucide-react'
import ModalShell from '../../components/common/ModalShell.jsx'

const INITIAL_QUEUE = [
  { id: 1, title: 'Building Resilient Microservices', author: 'ops_alex' },
  { id: 2, title: 'A Beginner Guide to WASM', author: 'newdev_ray' },
]

const FLAG_REASONS = ['Spam', 'Misinformation', 'Guideline violation']

export default function ReviewQueue() {
  const navigate = useNavigate()
  const [queue, setQueue] = useState(INITIAL_QUEUE)
  const [flagging, setFlagging] = useState(null)
  const [reason, setReason] = useState(FLAG_REASONS[0])
  const [notes, setNotes] = useState('')

  const approve = (id) => setQueue(queue.filter((q) => q.id !== id))

  const submitFlag = (e) => {
    e.preventDefault()
    setQueue(queue.filter((q) => q.id !== flagging.id))
    setFlagging(null)
    setNotes('')
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Content Review Queue</h1>

      {queue.length === 0 ? (
        <div className="empty-state">Nothing pending review.</div>
      ) : (
        <div className="stack-grid">
          {queue.map((item) => (
            <div key={item.id} className="card">
              <div className="card-body">
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div className="muted mono" style={{ fontSize: 11, marginBottom: 12 }}>by {item.author}</div>
                <div className="action-row">
                  <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => approve(item.id)}>
                    <Check size={14} /> Approve
                  </button>
                  <button className="btn btn-danger" style={{ width: 'auto', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setFlagging(item)}>
                    <Flag size={14} /> Flag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {flagging && (
        <ModalShell title={`Flag "${flagging.title}"`} onClose={() => setFlagging(null)}>
          <form onSubmit={submitFlag}>
            <div className="field">
              <label className="mono muted">Reason</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: '100%', padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }}>
                {FLAG_REASONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="mono muted">Notes</label>
              <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional context (optional)" />
            </div>
            <button type="submit" className="btn btn-danger">Submit flag</button>
          </form>
        </ModalShell>
      )}
    </div>
  )
}