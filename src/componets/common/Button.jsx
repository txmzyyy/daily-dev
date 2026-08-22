import clsx from 'clsx'

/**
 * Button
 *
 * variant: 'primary' | 'secondary' | 'danger'
 * size: 'md' (default) | 'sm'
 * block: true (default) — full width on mobile, shrinks to content width on
 *        tablet+ via the .btn-inline class. Pass block={false} to always
 *        stay content-width (e.g. inline actions in a card).
 * icon: optional lucide-react icon component, rendered before the label
 * as: html element to render — defaults to 'button', pass 'a' for links
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = true,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'btn',
        `btn-${variant}`,
        block && 'btn-block',
        !block && 'btn-inline',
        size === 'sm' && 'btn-sm',
        disabled && 'btn-disabled',
        className
      )}
      style={{
        display: Icon ? 'inline-flex' : undefined,
        alignItems: Icon ? 'center' : undefined,
        justifyContent: Icon ? 'center' : undefined,
        gap: Icon ? 8 : undefined,
        flexDirection: Icon && iconPosition === 'right' ? 'row-reverse' : 'row',
      }}
      {...rest}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  )
}