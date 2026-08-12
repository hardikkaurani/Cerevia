/**
 * Extracts a single uppercase initial for avatar fallback display.
 *
 * Priority:
 *   1. First character of `name` (trimmed)
 *   2. First character of `email` (trimmed)
 *   3. "U" (universal fallback)
 *
 * Guarantees:
 *   - Always returns exactly one uppercase character
 *   - null-safe, undefined-safe, whitespace-safe
 *   - Never throws
 */
export function getAvatarInitial(
  name?: string | null,
  email?: string | null,
): string {
  const trimmedName = name?.trim();
  if (trimmedName && trimmedName.length > 0) {
    return trimmedName[0].toUpperCase();
  }

  const trimmedEmail = email?.trim();
  if (trimmedEmail && trimmedEmail.length > 0) {
    return trimmedEmail[0].toUpperCase();
  }

  return 'U';
}
