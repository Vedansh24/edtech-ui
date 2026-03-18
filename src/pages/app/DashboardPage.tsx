import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageShell } from '../../components/shell/PageShell'
import { CourseCard } from '../../components/course/CourseCard'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { useAuth } from '../../hooks/useAuth'
import type { Course } from '../../types'
import { apiListCourses } from '../../utils/mockApi'
import { computeProgressSnapshot } from '../../utils/progress'

export function DashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    let alive = true
    apiListCourses()
      .then((c) => alive && setCourses(c))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const progress = useMemo(() => computeProgressSnapshot(courses), [courses])
  const enrolled = useMemo(() => courses.slice(0, 2), [courses])
  const recommended = useMemo(() => courses.slice(2), [courses])

  return (
    <PageShell
      title={`Welcome back, ${user?.name?.split(' ')[0] ?? 'Learner'}`}
      description="Pick up where you left off, or explore something new."
      actions={
        <Button asChild className="gap-2">
          <Link to="/app/courses">
            Explore courses <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Progress snapshot</CardTitle>
            <div className="text-xs text-muted-foreground">Updated from your learning activity</div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {loading ? (
              <>
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </>
            ) : (
              courses.slice(0, 3).map((course) => {
                const p = progress.byCourseId[course.id]?.percent ?? 0
                return (
                  <div key={course.id} className="rounded-xl border bg-background/60 p-4">
                    <div className="text-sm font-semibold">{course.title}</div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${p}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{p}% complete</div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-semibold">Enrolled courses</div>
              <div className="text-sm text-muted-foreground">Continue learning from your library.</div>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/courses">View all</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              <>
                <Skeleton className="h-[360px]" />
                <Skeleton className="h-[360px]" />
              </>
            ) : (
              enrolled.map((course) => (
                <CourseCard key={course.id} course={course} progressPercent={progress.byCourseId[course.id]?.percent ?? 0} />
              ))
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold">Recommended for you</div>
              <div className="text-sm text-muted-foreground">Curated picks based on your interests (mock).</div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {loading ? (
              <>
                <Skeleton className="h-[300px]" />
                <Skeleton className="h-[300px]" />
                <Skeleton className="h-[300px]" />
              </>
            ) : (
              recommended.map((course) => <CourseCard key={course.id} course={course} variant="compact" />)
            )}
          </div>
        </section>
      </div>
    </PageShell>
  )
}

