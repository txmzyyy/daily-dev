import clsx from 'clsx'

/**
 * CategoryChip
 *
 * label: chip text, e.g. "Frontend"
 * subtext: optional secondary line, e.g. "2.8k posts" (used in onboarding grid)
 * selected: boolean — toggles the active/selected visual state
 * size: 'md' (default, used in onboarding grid) | 'sm' (used in filter rows)
 * onClick: toggle handler
 */
export default function CategoryChip({ label, subtext, selected = false, size = 'md', onClick }) {
  return (
    <button
      type="button"
      className={clsx('chip', selected && 'selected')}
      style={
        size === 'sm'
          ? { padding: '8px 14px', whiteSpace: 'nowrap' }
          : { textAlign: 'left' }
      }
      onClick={onClick}
      aria-pressed={selected}
    >
      <div style={{ fontWeight: 600, fontSize: size === 'sm' ? 13 : 15 }}>{label}</div>
      {subtext && (
        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
          {subtext}
        </div>
      )}
    </button>
  )
}