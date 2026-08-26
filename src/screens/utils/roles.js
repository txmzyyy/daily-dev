/**
 * roles.js — single source of truth for role identifiers, display labels,
 * and permission checks. Several screens were comparing user.role against
 * raw strings inline (PostContent's publish-vs-submit logic, App.jsx's
 * RequireRole guard) — centralizing here means the role model only has
 * one place to change.
 */

export const ROLES = {
  USER: 'user',
  WRITER: 'writer',
  ADMIN: 'admin',
}

// Display label per role — e.g. SignUp's "I am a—" selector maps its
// Developer/Tech Writer choice to ROLES.USER/ROLES.WRITER internally,
// but shows these labels to the person.
export const ROLE_LABELS = {
  [ROLES.USER]: 'Developer',
  [ROLES.WRITER]: 'Tech Writer',
  [ROLES.ADMIN]: 'Admin',
}

export const isWriter = (role) => role === ROLES.WRITER
export const isAdmin = (role) => role === ROLES.ADMIN
export const isUser = (role) => role === ROLES.USER

// Writers and admins publish content directly; regular users submit
// their post for review instead (see PostContent's submit button label
// and post-submit redirect).
export const canPublishDirectly = (role) => isWriter(role) || isAdmin(role)

// Only admins can moderate flagged content platform-wide; writers only
// see their own review queue (own + community per the original blueprint,
// but can't touch Admin's Content Moderation Queue).
export const canModeratePlatform = (role) => isAdmin(role)

// Both writers and admins can create/manage categories.
export const canManageCategories = (role) => isWriter(role) || isAdmin(role)

export function roleLabel(role) {
  return ROLE_LABELS[role] || 'Guest'
}