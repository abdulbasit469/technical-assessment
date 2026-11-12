export function makeSnippet(text: string, query: string, radius = 90): string {
  const lower = text.toLowerCase();
  const positions = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 2)
    .map((term) => lower.indexOf(term.slice(0, Math.max(3, term.length - 2))))
    .filter((position) => position >= 0)
    .sort((a, b) => a - b);

  const hit = positions[0] ?? 0;
  const start = Math.max(0, hit - radius);
  const end = Math.min(text.length, hit + radius);
  const body = text.slice(start, end).trim();

  return `${start > 0 ? '…' : ''}${body}${end < text.length ? '…' : ''}`;
}