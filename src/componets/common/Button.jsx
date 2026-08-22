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