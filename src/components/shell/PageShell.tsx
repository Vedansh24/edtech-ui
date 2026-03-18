import { motion } from 'framer-motion'

import { cn } from '../../utils/cn'

export function PageShell({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn('container py-6 md:py-8', className)}
    >
      {(title || description || actions) && (
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            {title && <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>}
            {description && <p className="text-sm text-muted-foreground md:text-base">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </motion.div>
  )
}

