import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BookOpen, ChevronRight, Star, Users } from 'lucide-react'

import type { Course } from '../../types'
import { apiGetCourse } from '../../utils/mockApi'
import { formatCompactNumber, formatDuration } from '../../utils/format'
import { PageShell } from '../../components/shell/PageShell'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Skeleton } from '../../components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

export function CourseDetailPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    if (!courseId) return
    let alive = true
    apiGetCourse(courseId)
      .then((c) => alive && setCourse(c))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [courseId])

  const firstLessonId = useMemo(() => course?.modules[0]?.lessons[0]?.id, [course])

  if (loading) {
    return (
      <PageShell title="Course" description="Loading course details…">
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-[240px] md:col-span-2" />
          <Skeleton className="h-[240px]" />
          <Skeleton className="h-[220px] md:col-span-2" />
          <Skeleton className="h-[220px]" />
        </div>
      </PageShell>
    )
  }

  if (!course) {
    return (
      <PageShell title="Course not found" description="This course doesn’t exist (mock).">
        <Button asChild variant="outline">
          <Link to="/app/courses">Back to courses</Link>
        </Button>
      </PageShell>
    )
  }

  return (
    <PageShell
      title={course.title}
      description={course.subtitle}
      actions={
        <Button
          className="gap-2"
          onClick={() => {
            if (!firstLessonId) return
            navigate(`/app/learn/${course.id}/${firstLessonId}`)
          }}
        >
          Start learning <ChevronRight className="h-4 w-4" />
        </Button>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden md:col-span-2">
          <div className="relative aspect-[16/7] w-full bg-muted">
            <img src={course.coverImage} alt={course.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <Badge variant="subtle">{course.category}</Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                {course.level}
              </Badge>
            </div>
          </div>
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-foreground">
                <Star className="h-4 w-4 text-primary" />
                {course.rating.toFixed(1)}
              </span>
              <span>{formatCompactNumber(course.ratingCount)} reviews</span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4" />
                {formatCompactNumber(course.studentsCount)} learners
              </span>
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {formatDuration(course.durationMinutes)}
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="text-sm font-semibold">What you’ll learn</div>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-base">Instructor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} />
                <AvatarFallback>{course.instructor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{course.instructor.name}</div>
                <div className="text-xs text-muted-foreground">{course.instructor.role}</div>
              </div>
            </div>
            <div className="rounded-xl border bg-background/60 p-4 text-sm text-muted-foreground">
              This is mock instructor data. Replace with real profile and credentials from your backend.
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Syllabus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {course.modules.map((m) => (
              <div key={m.id} className="rounded-xl border bg-background/60 p-4">
                <div className="text-sm font-semibold">{m.title}</div>
                <div className="mt-3 grid gap-2">
                  {m.lessons.map((l) => (
                    <button
                      key={l.id}
                      className="flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-left text-sm transition hover:bg-accent"
                      onClick={() => navigate(`/app/learn/${course.id}/${l.id}`)}
                    >
                      <span className="font-medium">{l.title}</span>
                      <span className="text-xs text-muted-foreground">{l.durationMinutes}m</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {course.reviews.map((r) => (
              <div key={r.id} className="rounded-xl border bg-background/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{r.userName}</div>
                  <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    {r.rating}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

