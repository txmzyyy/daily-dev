import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import ModalShell from '../../components/common/ModalShell.jsx'

const INITIAL = [
  { name: 'Frontend', description: 'UI frameworks, CSS, browser APIs' },
  { name: 'Backend', description: 'Servers, databases, APIs' },
  { name: 'DevOps', description: 'CI/CD, infra, containers' },
  { name: 'Mobile', description: 'iOS, Android, cross-platform' },
]

export default function CategoryManagement() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(INITIAL)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', description: '' })

  const openNew = () => { setEditing(null); setForm({ name: '', description: '' }); setShowModal(true) }
  const openEdit = (cat) => { setEditing(cat); setForm(cat); setShowModal(true) }
  const remove = (name) => setCategories(categories.filter((c) => c.name !== name))

  const save = (e) => {
    e.preventDefault()
    if (editing) {
      setCategories(categories.map((c) => c.name === editing.name ? form : c))
    } else {
      setCategories([...categories, form])
    }
    setShowModal(false)
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>Category Management</h1>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }} onClick={openNew}>
          <Plus size={16} /> New
        </button>
      </div>

      <div className="stack-grid">
        {categories.map((c) => (
          <div key={c.name} className="card">
            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
                <div className="muted" style={{ fontSize: 13 }}>{c.description}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button className="btn-icon" style={{ background: 'var(--surface-2)', border: 'none' }} onClick={() => openEdit(c)}>
                  <Pencil size={14} />
                </button>
                <button className="btn-icon" style={{ background: 'var(--danger-dim)', border: 'none', color: 'var(--danger)' }} onClick={() => remove(c.name)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalShell title={editing ? 'Edit category' : 'New category'} onClose={() => setShowModal(false)}>
          <form onSubmit={save}>
            <div className="field">
              <label className="mono muted">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="field">
              <label className="mono muted">Description</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary">{editing ? 'Save changes' : 'Create category'}</button>
          </form>
        </ModalShell>
      )}
    </div>
  )
}