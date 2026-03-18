import type { Course, Post, Session } from '../types'
import { mockCourses, mockPostsSeed, mockSession } from './mockData'
import { getJson, setJson, storageKeys } from './storage'

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function jitter(min = 250, max = 750) {
  return Math.floor(min + Math.random() * (max - min))
}

export async function apiLogin(email: string, password: string): Promise<Session> {
  void password
  await wait(jitter())
  return { ...mockSession, user: { ...mockSession.user, email } }
}

export async function apiSignup(name: string, email: string, password: string): Promise<Session> {
  void password
  await wait(jitter())
  return { ...mockSession, user: { ...mockSession.user, name, email } }
}

export async function apiRequestPasswordReset(email: string) {
  void email
  await wait(jitter())
  return { ok: true }
}

export async function apiListCourses(): Promise<Course[]> {
  await wait(jitter(300, 900))
  return mockCourses
}

export async function apiGetCourse(courseId: string): Promise<Course> {
  await wait(jitter(250, 800))
  const course = mockCourses.find((c) => c.id === courseId)
  if (!course) throw new Error('Course not found')
  return course
}

export async function apiListFeed(): Promise<Post[]> {
  await wait(jitter(250, 800))
  const stored = getJson<Post[]>(storageKeys.posts)
  return stored?.length ? stored : mockPostsSeed
}

export async function apiCreatePost(input: { content: string; imageUrl?: string }): Promise<Post> {
  await wait(jitter(200, 600))
  const next: Post = {
    id: `p_${Math.random().toString(16).slice(2)}`,
    authorName: mockSession.user.name,
    authorTitle: mockSession.user.title,
    authorAvatarUrl: mockSession.user.avatarUrl,
    content: input.content,
    imageUrl: input.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  }
  const existing = getJson<Post[]>(storageKeys.posts) ?? mockPostsSeed
  const updated = [next, ...existing]
  setJson(storageKeys.posts, updated)
  return next
}

