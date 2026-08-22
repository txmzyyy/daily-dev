/**
 * Input
 *
 * as: 'input' (default) | 'textarea' | 'select'
 * label: mono uppercase field label
 * error: optional error message, shown below the field in red
 * hint: optional helper text (e.g. character count), shown below the field
 * All other props (value, onChange, placeholder, rows, options for select, etc.)
 * pass straight through to the underlying element.
 */
export default function Input({
  as = 'input',
  label,
  error,
  hint,
  options, // for as="select": [{ value, label }]
  className,
  ...rest
}) {
  const Field = as

  return (
    <div className="field">
      {label && <label className="mono muted">{label}</label>}

      {as === 'select' ? (
        <select
          {...rest}
          style={{
            width: '100%',
            padding: 12,
            background: 'var(--surface)',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
            borderRadius: 8,
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
          }}
        >
          {options?.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <Field
          {...rest}
          style={error ? { borderColor: 'var(--danger)' } : undefined}
        />
      )}

      {error && (
        <div className="mono" style={{ color: 'var(--danger)', fontSize: 11, marginTop: 4, textTransform: 'none', letterSpacing: 0 }}>
          {error}
        </div>
      )}
      {!error && hint && (
        <div className="muted" style={{ fontSize: 11, marginTop: 4, textAlign: 'right' }}>
          {hint}
        </div>
      )}
    </div>
  )
}