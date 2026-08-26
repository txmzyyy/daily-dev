import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const DEMO_ROLES = ['user', 'writer', 'admin']

export default function LogIn() {
  const navigate = useNavigate()
  const { loginAs } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginAs('user')
    navigate('/home')
  }

  const quickLogin = (role) => {
    loginAs(role)
    navigate(role === 'user' ? '/home' : role === 'writer' ? '/writer/dashboard' : '/admin/dashboard')
  }

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
        <ArrowLeft size={18} />
      </button>

      <h1 style={{ fontSize: 28, marginBottom: 6 }}>Welcome back.</h1>
      <p className="muted" style={{ marginBottom: 28 }}>Log in to your account.</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="mono muted">Email</label>
          <input type="email" placeholder="you@company.dev" value={form.email} onChange={update('email')} required />
        </div>
        <div className="field">
          <label className="mono muted">Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={update('password')} required />
        </div>

        <p className="muted" style={{ textAlign: 'right', marginBottom: 20, fontSize: 13 }}>
          <a href="#" style={{ color: 'var(--muted)' }}>Forgot password?</a>
        </p>

        <button type="submit" className="btn btn-primary">Log in</button>
      </form>

      <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <p className="mono muted" style={{ marginBottom: 10 }}>Demo quick login</p>
        <div className="action-row">
          {DEMO_ROLES.map((role) => (
            <button key={role} className="btn btn-secondary" style={{ width: 'auto', flex: '1 1 100px', textTransform: 'capitalize' }} onClick={() => quickLogin(role)}>
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}