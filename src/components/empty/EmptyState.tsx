import { cn } from '../../utils/cn'
import { Button } from '../ui/button'

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: {
  title: string
  description?: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-10 text-center shadow-soft',
        className,
      )}
    >
      {icon && <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">{icon}</div>}
      <div className="space-y-1">
        <div className="text-base font-semibold">{title}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

