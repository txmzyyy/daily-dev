import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import ModalShell from '../../components/common/ModalShell.jsx'

const INITIAL = [
  { name: 'Frontend', description: 'UI frameworks, CSS, browser APIs' },
  { name: 'Backend', description: 'Servers, databases, APIs' },
  { name: 'DevOps', description: 'CI/CD, infra, containers' },
]

export default function ManageCategories() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(INITIAL)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', parent: '' })

  const addCategory = (e) => {
    e.preventDefault()
    setCategories([...categories, { name: form.name, description: form.description }])
    setForm({ name: '', description: '', parent: '' })
    setShowModal(false)
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>Manage Categories</h1>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setShowModal(true)}>
          <Plus size={16} /> New
        </button>
      </div>

      <div className="stack-grid">
        {categories.map((c) => (
          <div key={c.name} className="card">
            <div className="card-body">
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
              <div className="muted" style={{ fontSize: 13 }}>{c.description}</div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalShell title="New category" onClose={() => setShowModal(false)}>
          <form onSubmit={addCategory}>
            <div className="field">
              <label className="mono muted">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="field">
              <label className="mono muted">Description</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="field">
              <label className="mono muted">Parent category (optional)</label>
              <select value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })} style={{ width: '100%', padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }}>
                <option value="">None</option>
                {categories.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create category</button>
          </form>
        </ModalShell>
      )}
    </div>
  )
}