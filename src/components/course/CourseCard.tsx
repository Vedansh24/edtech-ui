import { Link } from 'react-router-dom'
import { ChevronRight, Star } from 'lucide-react'

import type { Course } from '../../types'
import { formatCompactNumber, formatDuration } from '../../utils/format'
import { cn } from '../../utils/cn'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

export function CourseCard({
  course,
  progressPercent,
  variant = 'default',
}: {
  course: Course
  progressPercent?: number
  variant?: 'default' | 'compact'
}) {
  return (
    <Card className={cn('overflow-hidden transition hover:-translate-y-0.5 hover:shadow-soft', variant === 'compact' && 'shadow-none')}>
      <Link to={`/app/courses/${course.id}`} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <img src={course.coverImage} alt={course.title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            <Badge variant="subtle">{course.category}</Badge>
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
              {course.level}
            </Badge>
          </div>
        </div>
      </Link>

      <CardHeader className={cn('space-y-2', variant === 'compact' && 'p-4')}>
        <CardTitle className={cn('text-base md:text-lg', variant === 'compact' && 'text-sm')}>{course.title}</CardTitle>
        <div className="text-sm text-muted-foreground">{course.subtitle}</div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-foreground">
            <Star className="h-3.5 w-3.5 text-primary" />
            {course.rating.toFixed(1)}
          </span>
          <span>({formatCompactNumber(course.ratingCount)})</span>
          <span>{formatCompactNumber(course.studentsCount)} learners</span>
          <span>{formatDuration(course.durationMinutes)}</span>
        </div>
      </CardHeader>

      <CardContent className={cn('space-y-3', variant === 'compact' && 'p-4 pt-0')}>
        {typeof progressPercent === 'number' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span className="text-foreground">{progressPercent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {course.tags.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary" className="font-normal">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className={cn('justify-between', variant === 'compact' && 'p-4 pt-0')}>
        <div className="text-xs text-muted-foreground">
          By <span className="text-foreground">{course.instructor.name}</span>
        </div>
        <Button asChild size="sm" variant="ghost">
          <Link to={`/app/courses/${course.id}`} className="gap-1">
            View <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

