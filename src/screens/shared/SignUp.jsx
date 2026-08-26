import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import clsx from 'clsx'

export default function SignUp() {
  const navigate = useNavigate()
  const [role, setRole] = useState('developer') // 'developer' | 'writer'
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/onboarding/interests')
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
        <ArrowLeft size={18} />
      </button>

      <h1 style={{ fontSize: 28, marginBottom: 6 }}>Join the community.</h1>
      <p className="muted" style={{ marginBottom: 28 }}>Create a free developer account.</p>

      <div className="mono muted" style={{ marginBottom: 8 }}>I am a —</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button
          type="button"
          className={clsx('chip', role === 'developer' && 'selected')}
          style={{ flex: 1, textAlign: 'center' }}
          onClick={() => setRole('developer')}
        >
          Developer
        </button>
        <button
          type="button"
          className={clsx('chip', role === 'writer' && 'selected')}
          style={{ flex: 1, textAlign: 'center' }}
          onClick={() => setRole('writer')}
        >
          Tech Writer
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label className="mono muted">Name</label>
            <input placeholder="Your full name" value={form.name} onChange={update('name')} required />
          </div>
          <div className="field">
            <label className="mono muted">Email</label>
            <input type="email" placeholder="you@company.dev" value={form.email} onChange={update('email')} required />
          </div>
        </div>
        <div className="field">
          <label className="mono muted">Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={update('password')} required />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
          Continue
        </button>
      </form>

      <p className="muted" style={{ textAlign: 'center', marginTop: 20 }}>
        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login') }} style={{ color: 'var(--lime)' }}>Log in</a>
      </p>
    </div>
  )
}