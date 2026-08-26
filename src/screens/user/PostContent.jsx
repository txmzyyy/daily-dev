import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Video, Headphones } from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../../context/AuthContext.jsx'

const TYPES = [
  { key: 'article', label: 'Article', icon: FileText },
  { key: 'video', label: 'Video', icon: Video },
  { key: 'audio', label: 'Audio', icon: Headphones },
]
const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Data / ML', 'Security']

export default function PostContent() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [type, setType] = useState('article')
  const [form, setForm] = useState({ title: '', category: CATEGORIES[0], description: '' })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    // Writers can publish directly; regular users submit for review
    navigate(user?.role === 'writer' ? '/writer/dashboard' : '/home')
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <h1 style={{ fontSize: 24, marginBottom: 20 }}>New post</h1>

      <div className="action-row" style={{ marginBottom: 20 }}>
        {TYPES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={clsx('chip', type === key && 'selected')}
            style={{ flex: '1 1 100px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '14px 8px' }}
            onClick={() => setType(key)}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </div>

      <div style={{ border: '1px dashed var(--border)', borderRadius: 10, padding: 24, textAlign: 'center', marginBottom: 20, color: 'var(--muted)' }}>
        {type === 'article' ? 'Write your article body here' : `Upload or embed ${type} link`}
      </div>

      <form onSubmit={submit}>
        <div className="field">
          <label className="mono muted">Title</label>
          <input value={form.title} onChange={update('title')} placeholder="Give your post a title" required />
        </div>
        <div className="field">
          <label className="mono muted">Category</label>
          <select value={form.category} onChange={update('category')} style={{ width: '100%', padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="mono muted">Description</label>
          <textarea rows={3} value={form.description} onChange={update('description')} placeholder="A short summary" />
        </div>

        <button type="submit" className="btn btn-primary">
          {user?.role === 'writer' ? 'Publish' : 'Submit for review'}
        </button>
      </form>
    </div>
  )
}