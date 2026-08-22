import Button from './Button.jsx'

/**
 * EmptyState
 *
 * icon: optional lucide-react icon component shown above the title
 * title: short headline, e.g. "Nothing saved yet"
 * description: optional supporting line
 * actionLabel / onAction: optional CTA button (e.g. "Customize interests")
 */
export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <Icon size={20} color="var(--muted)" />
        </div>
      )}
      {title && <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: description ? 6 : 0 }}>{title}</div>}
      {description && <p className="muted" style={{ margin: '0 auto', maxWidth: 280, fontSize: 14 }}>{description}</p>}
      {actionLabel && onAction && (
        <div style={{ maxWidth: 220, margin: '20px auto 0' }}>
          <Button variant="secondary" onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  )
}