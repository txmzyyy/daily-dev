import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus } from 'lucide-react'
import ModalShell from '../../components/common/ModalShell.jsx'
import { MOCK_USERS } from '../../data/mockUsers.js'


export default function UserManagement() {
  const navigate = useNavigate()
  const [users, setUsers] = useState(MOCK_USERS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ email: '', role: 'user' })

  const toggleStatus = (id) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'deactivated' : 'active' } : u))
  }

  const inviteUser = (e) => {
    e.preventDefault()
    setUsers([...users, { id: Date.now(), name: form.email.split('@')[0], role: form.role, status: 'active' }])
    setForm({ email: '', role: 'user' })
    setShowModal(false)
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>User Management</h1>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setShowModal(true)}>
          <UserPlus size={16} /> Add
        </button>
      </div>

      <div className="stack-grid">
        {users.map((u) => (
          <div key={u.id} className="card">
            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{u.name}</div>
                <div className="muted mono" style={{ fontSize: 11, textTransform: 'uppercase' }}>{u.role}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`tag ${u.status === 'active' ? 'tag-lime' : 'tag-danger'}`}>{u.status}</span>
                <button
                  className={u.status === 'active' ? 'btn btn-danger' : 'btn btn-secondary'}
                  style={{ width: 'auto', padding: '6px 12px', fontSize: 12 }}
                  onClick={() => toggleStatus(u.id)}
                >
                  {u.status === 'active' ? 'Deactivate' : 'Restore'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalShell title="Add user" onClose={() => setShowModal(false)}>
          <form onSubmit={inviteUser}>
            <div className="field">
              <label className="mono muted">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@company.dev" required />
            </div>
            <div className="field">
              <label className="mono muted">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={{ width: '100%', padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }}>
                <option value="user">Developer</option>
                <option value="writer">Tech Writer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Send invite</button>
          </form>
        </ModalShell>
      )}
    </div>
  )
}