export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat(undefined, { notation: 'compact' }).format(value)
}

export function formatDuration(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h <= 0) return `${m}m`
  return `${h}h ${m}m`
}

export function formatDateTime(iso: string) {
  const d = new Date(iso)
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

