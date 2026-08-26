import { X } from 'lucide-react'

/**
 * ModalShell
 *
 * title: modal heading
 * onClose: called on backdrop click or the X button
 * footer: optional node rendered below children (e.g. action buttons),
 *         separated by a top border
 *
 * Responsive: renders as a bottom sheet on mobile (< 768px) and a centered
 * dialog on tablet+ (see .modal-overlay / .modal-content in style.css).
 */
export default function ModalShell({ title, onClose, footer, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="card modal-content"
        style={{ margin: 0 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18 }}>{title}</h3>
            <button
              className="btn-icon"
              style={{ background: 'none', border: 'none', color: 'var(--muted)' }}
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {children}

          {footer && (
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}