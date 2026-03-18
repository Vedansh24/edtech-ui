import type { Course, ProgressSnapshot } from '../types'
import { getJson, setJson, storageKeys } from './storage'

type StoredProgress = ProgressSnapshot

export function getStoredProgress(): StoredProgress {
  return (
    getJson<StoredProgress>(storageKeys.progress) ?? {
      byCourseId: {},
      byLessonId: {},
    }
  )
}

export function computeProgressSnapshot(courses: Course[]): ProgressSnapshot {
  const stored = getStoredProgress()
  const byCourseId: ProgressSnapshot['byCourseId'] = {}

  for (const course of courses) {
    const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id))
    const totalLessons = lessonIds.length
    const completedLessons = lessonIds.filter((id) => stored.byLessonId[id]?.completed).length
    const percent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0
    byCourseId[course.id] = { completedLessons, totalLessons, percent }
  }

  return { byCourseId, byLessonId: stored.byLessonId }
}

export function setLessonCompleted(courseId: string, lessonId: string, completed: boolean) {
  const stored = getStoredProgress()
  stored.byLessonId[lessonId] = {
    courseId,
    lessonId,
    completed,
    updatedAt: new Date().toISOString(),
  }
  setJson(storageKeys.progress, stored)
}

