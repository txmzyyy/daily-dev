import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

const INITIAL = ['Frontend', 'DevOps', 'Data / ML']

export default function MySubscriptions() {
  const navigate = useNavigate()
  const [subs, setSubs] = useState(INITIAL)

  const remove = (name) => setSubs(subs.filter((s) => s !== name))

  return (
    <div className="screen">
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>My Subscriptions</h1>

      {subs.length === 0 ? (
        <div className="empty-state">You haven't subscribed to any categories yet.</div>
      ) : (
        <div className="stack-grid">
          {subs.map((name) => (
            <div key={name} className="card">
              <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{name}</span>
                <button className="btn-icon" style={{ background: 'none', border: 'none', color: 'var(--muted)' }} onClick={() => remove(name)}>
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => navigate('/onboarding/interests')}>
        Customize interests
      </button>
    </div>
  )
}