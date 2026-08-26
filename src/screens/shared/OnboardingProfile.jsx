import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../../context/AuthContext.jsx'

const EXPERTISE_TAGS = ['Frontend', 'Backend', 'DevOps', 'Mobile']

export default function OnboardingProfile() {
  const navigate = useNavigate()
  const { loginAs } = useAuth()
  const [bio, setBio] = useState('')
  const [tags, setTags] = useState([])

  const toggleTag = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const finish = () => {
    loginAs('user')
    navigate('/home')
  }

  return (
    <div className="screen">
      <div className="progress">
        <div className="done" />
        <div className="done" />
      </div>

      <p className="mono" style={{ color: 'var(--lime)', marginBottom: 6 }}>Step 2 of 2</p>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Set up your profile.</h1>
      <p className="muted" style={{ marginBottom: 28 }}>Let the community know who you are. You can always edit this later.</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', border: '2px dashed var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Upload size={22} color="var(--violet)" />
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Upload avatar</div>
          <div className="muted" style={{ fontSize: 12 }}>JPG, PNG or GIF · Max 2MB</div>
        </div>
      </div>

      <div className="field">
        <label className="mono muted">Bio</label>
        <textarea
          rows={3}
          maxLength={160}
          placeholder="Senior engineer. Loves distributed systems and coffee."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="muted" style={{ textAlign: 'right', fontSize: 11, marginTop: 4 }}>{bio.length}/160</div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <label className="mono muted" style={{ display: 'block', marginBottom: 10 }}>Expertise tags</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {EXPERTISE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={clsx('chip', tags.includes(tag) && 'selected')}
              style={{ padding: '8px 14px' }}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={finish}>Finish setup</button>
    </div>
  )
}