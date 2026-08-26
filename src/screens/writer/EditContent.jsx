import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MOCK_CONTENT } from '../../data/mockContent.js'

export default function EditContent() {
  const navigate = useNavigate()
  const { id } = useParams()
  const existing = MOCK_CONTENT.find((c) => String(c.id) === id) || MOCK_CONTENT[0]
  const [form, setForm] = useState({ title: existing.title, description: existing.description, category: existing.category })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const save = (e) => {
    e.preventDefault()
    navigate('/writer/dashboard')
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Edit content</h1>

      <form onSubmit={save}>
        <div className="field">
          <label className="mono muted">Title</label>
          <input value={form.title} onChange={update('title')} required />
        </div>
        <div className="field">
          <label className="mono muted">Category</label>
          <input value={form.category} onChange={update('category')} />
        </div>
        <div className="field">
          <label className="mono muted">Description</label>
          <textarea rows={4} value={form.description} onChange={update('description')} />
        </div>

        <button type="submit" className="btn btn-primary">Save changes</button>
      </form>
    </div>
  )
}