export type Id = string

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type CourseCategory =
  | 'Development'
  | 'Data Science'
  | 'Design'
  | 'Business'
  | 'Marketing'
  | 'Personal Growth'

export interface User {
  id: Id
  name: string
  email: string
  title?: string
  bio?: string
  avatarUrl?: string
  location?: string
  joinedAt: string
  achievements: Array<{ id: Id; title: string; description: string; earnedAt: string }>
}

export interface Review {
  id: Id
  userName: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: string
}

export interface Lesson {
  id: Id
  title: string
  durationMinutes: number
  type: 'video' | 'quiz' | 'reading'
}

export interface Module {
  id: Id
  title: string
  lessons: Lesson[]
}

export interface Instructor {
  name: string
  role: string
  avatarUrl?: string
}

export interface Course {
  id: Id
  title: string
  subtitle: string
  category: CourseCategory
  level: CourseLevel
  rating: number
  ratingCount: number
  studentsCount: number
  durationMinutes: number
  coverImage: string
  instructor: Instructor
  modules: Module[]
  reviews: Review[]
  tags: string[]
}

export interface Enrollment {
  courseId: Id
  enrolledAt: string
}

export interface LessonProgress {
  courseId: Id
  lessonId: Id
  completed: boolean
  lastPositionSeconds?: number
  updatedAt: string
}

export interface ProgressSnapshot {
  byCourseId: Record<Id, { completedLessons: number; totalLessons: number; percent: number }>
  byLessonId: Record<Id, LessonProgress>
}

export interface Comment {
  id: Id
  userName: string
  userAvatarUrl?: string
  content: string
  createdAt: string
}

export interface Post {
  id: Id
  authorName: string
  authorTitle?: string
  authorAvatarUrl?: string
  content: string
  imageUrl?: string
  createdAt: string
  likeCount: number
  commentCount: number
}

export interface Session {
  token: string
  user: User
}

