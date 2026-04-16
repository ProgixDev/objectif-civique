export function createId(prefix = ""): string {
  const random = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return prefix ? `${prefix}_${ts}${random}` : `${ts}${random}`;
}
