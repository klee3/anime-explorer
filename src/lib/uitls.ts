export function truncateString(
  str: string | null,
  maxLength: number
): string | null {
  if (!str) return null;
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}
