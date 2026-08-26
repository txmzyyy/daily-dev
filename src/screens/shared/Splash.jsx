import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()
  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, background: 'var(--violet)', borderRadius: 16, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28 }}>
        d.
      </div>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>daily.dev</h1>
      <p className="muted" style={{ marginBottom: 40 }}>Your dev feed, tuned to what you build.</p>

      <button className="btn btn-primary" style={{ marginBottom: 12 }} onClick={() => navigate('/signup')}>
        Sign up
      </button>
      <button className="btn btn-secondary" onClick={() => navigate('/login')}>
        Log in
      </button>
    </div>
  )
}