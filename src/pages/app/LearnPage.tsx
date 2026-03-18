import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { toast } from 'sonner'

import type { Course, Lesson } from '../../types'
import { apiGetCourse } from '../../utils/mockApi'
import { computeProgressSnapshot, getStoredProgress, setLessonCompleted } from '../../utils/progress'
import { getJson, setJson } from '../../utils/storage'
import { PageShell } from '../../components/shell/PageShell'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { Textarea } from '../../components/ui/textarea'
import { cn } from '../../utils/cn'

function notesKey(courseId: string, lessonId: string) {
  return `edtech.notes.${courseId}.${lessonId}`
}

export function LearnPage() {
  const { courseId, lessonId } = useParams()
  const key = `${courseId ?? 'x'}:${lessonId ?? 'y'}`

  if (!courseId || !lessonId) {
    return (
      <PageShell title="Lesson not found" description="This lesson doesn’t exist (mock).">
        <Button asChild variant="outline">
          <Link to="/app/courses">Back to courses</Link>
        </Button>
      </PageShell>
    )
  }

  return <LearnPageInner key={key} courseId={courseId} lessonId={lessonId} />
}

function LearnPageInner({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course | null>(null)
  const [notes, setNotes] = useState(() => getJson<string>(notesKey(courseId, lessonId)) ?? '')
  const [done, setDone] = useState(() => Boolean(getStoredProgress().byLessonId[lessonId]?.completed))

  useEffect(() => {
    let alive = true
    apiGetCourse(courseId)
      .then((c) => alive && setCourse(c))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [courseId])

  const allLessons = useMemo(() => course?.modules.flatMap((m) => m.lessons) ?? [], [course])
  const lesson = useMemo<Lesson | null>(() => allLessons.find((l) => l.id === lessonId) ?? null, [allLessons, lessonId])

  const navIds = useMemo(() => {
    const ids = allLessons.map((l) => l.id)
    const idx = ids.findIndex((id) => id === lessonId)
    return { prev: idx > 0 ? ids[idx - 1] : null, next: idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null }
  }, [allLessons, lessonId])

  const progress = useMemo(() => (course ? computeProgressSnapshot([course]) : null), [course])

  if (loading) {
    return (
      <PageShell title="Learning" description="Loading lesson…">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Skeleton className="h-[420px]" />
          <Skeleton className="h-[420px]" />
        </div>
      </PageShell>
    )
  }

  if (!course || !lesson || !courseId || !lessonId) {
    return (
      <PageShell title="Lesson not found" description="This lesson doesn’t exist (mock).">
        <Button asChild variant="outline">
          <Link to="/app/courses">Back to courses</Link>
        </Button>
      </PageShell>
    )
  }

  const percent = progress?.byCourseId[course.id]?.percent ?? 0

  return (
    <PageShell
      title={lesson.title}
      description={`${course.title} · ${percent}% complete`}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navIds.prev && navigate(`/app/learn/${courseId}/${navIds.prev}`)}
            disabled={!navIds.prev}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navIds.next && navigate(`/app/learn/${courseId}/${navIds.next}`)}
            disabled={!navIds.next}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full bg-black">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center gap-3 text-center text-white">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
                      <Play className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-medium">Video player placeholder</div>
                    <div className="max-w-md text-xs text-white/70">
                      Replace this area with a real player (HLS/DASH) when you connect a backend.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Course progress</span>
                    <span className="text-foreground">{percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant={done ? 'secondary' : 'default'}
                    className="gap-2"
                    onClick={() => {
                      const next = !done
                      setLessonCompleted(courseId, lessonId, next)
                      setDone(next)
                      toast.success(next ? 'Marked as completed' : 'Marked as not completed')
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {done ? 'Completed' : 'Mark complete'}
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/app/courses/${courseId}`}>Course details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-4">
              <div className="text-sm font-semibold">Notes</div>
              <Textarea
                value={notes}
                onChange={(e) => {
                  const next = e.target.value
                  setNotes(next)
                  setJson(notesKey(courseId, lessonId), next)
                }}
                placeholder="Capture key points, reminders, links…"
              />
              <div className="text-xs text-muted-foreground">Notes are stored locally in your browser.</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="text-sm font-semibold">Syllabus</div>
            <div className="mt-3 space-y-2">
              {course.modules.map((m) => (
                <div key={m.id} className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">{m.title}</div>
                  <div className="grid gap-1">
                    {m.lessons.map((l) => {
                      const active = l.id === lessonId
                      const done = Boolean(getStoredProgress().byLessonId[l.id]?.completed)
                      return (
                        <button
                          key={l.id}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-left text-sm transition hover:bg-accent',
                            active && 'border-primary/40 bg-accent',
                          )}
                          onClick={() => navigate(`/app/learn/${courseId}/${l.id}`)}
                        >
                          <div className="min-w-0">
                            <div className={cn('truncate font-medium', active && 'text-accent-foreground')}>{l.title}</div>
                            <div className="text-xs text-muted-foreground">{l.durationMinutes}m · {l.type}</div>
                          </div>
                          <div className={cn('text-xs', done ? 'text-primary' : 'text-muted-foreground')}>
                            {done ? 'Done' : ''}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

