import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, MapPin, Pencil } from 'lucide-react'

import { useAuth } from '../../hooks/useAuth'
import type { Course } from '../../types'
import { apiListCourses } from '../../utils/mockApi'
import { computeProgressSnapshot } from '../../utils/progress'
import { PageShell } from '../../components/shell/PageShell'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { CourseCard } from '../../components/course/CourseCard'

export function ProfilePage() {
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

  return (
    <PageShell
      title="Profile"
      description="Your details, achievements, and learning history."
      actions={
        <Button asChild variant="outline" className="gap-2">
          <Link to="/app/profile/edit">
            <Pencil className="h-4 w-4" /> Edit profile
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.avatarUrl} alt={user?.name ?? 'User'} />
                <AvatarFallback>{(user?.name ?? 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{user?.name}</div>
                <div className="truncate text-xs text-muted-foreground">{user?.title ?? 'Learner'}</div>
              </div>
            </div>

            {user?.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {user.location}
              </div>
            )}

            <div className="rounded-xl border bg-background/60 p-4 text-sm text-muted-foreground">
              {user?.bio ?? 'Add a bio to tell the community what you are learning.'}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Learner</Badge>
              <Badge variant="secondary">Community</Badge>
              <Badge variant="secondary">Career</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Achievements</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {(user?.achievements ?? []).map((a) => (
              <div key={a.id} className="rounded-xl border bg-background/60 p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{a.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{a.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <section className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold">Courses</div>
              <div className="text-sm text-muted-foreground">Your enrolled courses (mock).</div>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/courses">Browse</Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-[360px]" />
              <Skeleton className="h-[360px]" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {enrolled.map((course) => (
                <CourseCard key={course.id} course={course} progressPercent={progress.byCourseId[course.id]?.percent ?? 0} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  )
}

