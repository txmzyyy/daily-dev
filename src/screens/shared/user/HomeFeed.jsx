import { useState } from 'react'
import clsx from 'clsx'
import ContentCard from '../../components/content/ContentCard.jsx'
import { MOCK_CONTENT } from '../../data/mockContent.js'

const TABS = ['For You', 'Following', 'Trending']
const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Data / ML']

export default function HomeFeed() {
  const [tab, setTab] = useState('For You')
  const [category, setCategory] = useState('Frontend')

  const filtered = MOCK_CONTENT.filter((c) => !category || c.category === category)

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, background: 'var(--violet)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700 }}>d.</div>
        <h1 style={{ fontSize: 18 }}>daily.dev</h1>
      </div>

      <div style={{ display: 'flex', gap: 20, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', paddingBottom: 10,
              color: tab === t ? 'var(--lime)' : 'var(--muted)',
              borderBottom: tab === t ? '2px solid var(--lime)' : '2px solid transparent',
              fontWeight: 600, fontSize: 14,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={clsx('chip', category === c && 'selected')}
            style={{ padding: '8px 14px', whiteSpace: 'nowrap' }}
            onClick={() => setCategory(category === c ? null : c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No content yet in this category.</div>
      ) : (
        <div className="content-grid">
          {filtered.map((item) => <ContentCard key={item.id} content={item} />)}
        </div>
      )}
    </div>
  )
}