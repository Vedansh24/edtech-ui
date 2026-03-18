import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookOpen, Filter, Search } from 'lucide-react'

import type { Course, CourseCategory } from '../../types'
import { apiListCourses } from '../../utils/mockApi'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { PageShell } from '../../components/shell/PageShell'
import { CourseCard } from '../../components/course/CourseCard'
import { EmptyState } from '../../components/empty/EmptyState'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Skeleton } from '../../components/ui/skeleton'

const categories: Array<CourseCategory | 'All'> = [
  'All',
  'Development',
  'Data Science',
  'Design',
  'Business',
  'Marketing',
  'Personal Growth',
]

export function CoursesPage() {
  const [params, setParams] = useSearchParams()
  const initialQ = params.get('q') ?? ''

  const [q, setQ] = useState(initialQ)
  const dq = useDebouncedValue(q, 250)
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    let alive = true
    setLoading(true)
    apiListCourses()
      .then((c) => alive && setCourses(c))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const next = new URLSearchParams(params)
    if (dq.trim()) next.set('q', dq.trim())
    else next.delete('q')
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dq])

  const filtered = useMemo(() => {
    const text = dq.trim().toLowerCase()
    return courses.filter((c) => {
      const matchesCategory = category === 'All' ? true : c.category === category
      const matchesText = !text
        ? true
        : `${c.title} ${c.subtitle} ${c.instructor.name} ${c.tags.join(' ')}`.toLowerCase().includes(text)
      return matchesCategory && matchesText
    })
  }, [courses, category, dq])

  return (
    <PageShell
      title="Courses"
      description="Search, filter, and explore curated learning paths."
      actions={
        <div className="hidden items-center gap-2 md:flex">
          <Badge variant="subtle" className="gap-2">
            <Filter className="h-3.5 w-3.5" />
            {filtered.length} results
          </Badge>
        </div>
      }
    >
      <Card className="mb-6">
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, tag, instructor…" className="pl-9" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                variant={c === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[360px]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Try a different search term or category."
          icon={<BookOpen className="h-5 w-5" />}
          actionLabel="Clear filters"
          onAction={() => {
            setQ('')
            setCategory('All')
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </PageShell>
  )
}

