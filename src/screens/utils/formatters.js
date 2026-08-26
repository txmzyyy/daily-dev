import { format, formatDistanceToNowStrict, parseISO } from 'date-fns'

/**
 * formatters.js — date-fns-backed helpers so screens don't each roll
 * their own date math. ContentCard/ContentDetail show a publish date;
 * CommentThread's mock data currently has pre-formatted relative
 * strings ("2h ago"), but real timestamps from a backend would come in
 * as ISO strings — formatRelativeTime handles that conversion.
 */

// '2026-08-15' -> 'Aug 15, 2026'
export function formatDate(dateString, pattern = 'MMM d, yyyy') {
  if (!dateString) return ''
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    return format(date, pattern)
  } catch {
    return dateString // fall back to the raw value rather than throwing
  }
}

// ISO timestamp -> '2 hours ago' / '3 days ago'
export function formatRelativeTime(dateString) {
  if (!dateString) return ''
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    return `${formatDistanceToNowStrict(date)} ago`
  } catch {
    return dateString
  }
}

// 9 -> '9 min read'; already-formatted strings ("12 min") pass through unchanged
export function formatReadTime(value) {
  if (!value) return ''
  if (typeof value === 'number') return `${value} min read`
  return value
}

// Truncate long text with an ellipsis, without cutting a word in half
export function truncate(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text
  const clipped = text.slice(0, maxLength)
  const lastSpace = clipped.lastIndexOf(' ')
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}