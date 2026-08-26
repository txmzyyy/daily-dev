import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { CATEGORIES } from '../../data/mockCategories.js'


export default function OnboardingInterests() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(['frontend'])

  const toggle = (slug) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  return (
    <div className="screen">
      <div className="progress">
        <div className="done" />
        <div />
      </div>

      <p className="mono" style={{ color: 'var(--lime)', marginBottom: 6 }}>Step 1 of 2</p>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>What are you into?</h1>
      <p className="muted" style={{ marginBottom: 24 }}>Pick topics you care about. We'll tune your feed to match.</p>

      <div className="chip-grid" style={{ marginBottom: 32 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            className={clsx('chip', selected.includes(cat.slug) && 'selected')}
            onClick={() => toggle(cat.slug)}
            type="button"
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{cat.label}</div>
            <div className="muted" style={{ fontSize: 12 }}>{cat.posts}</div>
          </button>
        ))}
      </div>

      <button
        className="btn btn-primary"
        disabled={selected.length === 0}
        onClick={() => navigate('/onboarding/profile')}
      >
        Continue
      </button>
    </div>
  )
}