import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ProfileEdit() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: 'Senior engineer. Loves distributed systems and coffee.',
    password: '',
  })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const save = (e) => {
    e.preventDefault()
    navigate('/profile')
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        <ArrowLeft size={18} />
      </button>

      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Edit profile</h1>

      <form onSubmit={save}>
        <div className="field">
          <label className="mono muted">Name</label>
          <input value={form.name} onChange={update('name')} />
        </div>
        <div className="field">
          <label className="mono muted">Bio</label>
          <textarea rows={3} value={form.bio} onChange={update('bio')} />
        </div>
        <div className="field">
          <label className="mono muted">New password</label>
          <input type="password" placeholder="Leave blank to keep current" value={form.password} onChange={update('password')} />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>Save changes</button>
      </form>
    </div>
  )
}