import type { Course, CourseCategory, Post, Session, User } from '../types'

const nowIso = () => new Date().toISOString()

export const mockUser: User = {
  id: 'u_1',
  name: 'Vedan Sharma',
  email: 'vedan@example.com',
  title: 'Learner · Building skills daily',
  bio: 'Exploring full-stack, product design, and data. Here to learn by doing.',
  location: 'Bhopal, IN',
  avatarUrl:
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&crop=faces',
  joinedAt: '2025-10-01T10:00:00.000Z',
  achievements: [
    {
      id: 'a_1',
      title: '7‑Day Streak',
      description: 'Learned 7 days in a row',
      earnedAt: '2026-03-01T09:00:00.000Z',
    },
    {
      id: 'a_2',
      title: 'First Course Completed',
      description: 'Completed your first course',
      earnedAt: '2026-02-12T14:00:00.000Z',
    },
  ],
}

const c = (id: string, category: CourseCategory, title: string, subtitle: string): Course => ({
  id,
  title,
  subtitle,
  category,
  level: id === 'c_3' ? 'Advanced' : id === 'c_2' ? 'Intermediate' : 'Beginner',
  rating: id === 'c_3' ? 4.8 : 4.6,
  ratingCount: id === 'c_3' ? 12490 : 8420,
  studentsCount: id === 'c_3' ? 220_140 : 96_300,
  durationMinutes: id === 'c_3' ? 760 : 540,
  coverImage:
    category === 'Development'
      ? 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&fit=crop'
      : category === 'Data Science'
        ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&fit=crop'
        : category === 'Design'
          ? 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&fit=crop'
          : 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&fit=crop',
  instructor: {
    name: category === 'Design' ? 'Aarohi Mehta' : 'Neel Kapoor',
    role: category === 'Design' ? 'Product Designer' : 'Senior Engineer',
    avatarUrl:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=256&h=256&fit=crop&crop=faces',
  },
  tags:
    category === 'Development'
      ? ['React', 'TypeScript', 'Frontend']
      : category === 'Data Science'
        ? ['Python', 'ML', 'Pandas']
        : category === 'Design'
          ? ['UI', 'UX', 'Figma']
          : ['Strategy', 'Career'],
  modules: [
    {
      id: `${id}_m1`,
      title: 'Getting Started',
      lessons: [
        { id: `${id}_l1`, title: 'Welcome & roadmap', durationMinutes: 6, type: 'video' },
        { id: `${id}_l2`, title: 'Setup & tooling', durationMinutes: 14, type: 'video' },
        { id: `${id}_l3`, title: 'Quick checkpoint', durationMinutes: 8, type: 'quiz' },
      ],
    },
    {
      id: `${id}_m2`,
      title: 'Core Concepts',
      lessons: [
        { id: `${id}_l4`, title: 'Mental model', durationMinutes: 18, type: 'video' },
        { id: `${id}_l5`, title: 'Patterns that scale', durationMinutes: 22, type: 'video' },
        { id: `${id}_l6`, title: 'Applied exercise', durationMinutes: 20, type: 'reading' },
      ],
    },
  ],
  reviews: [
    {
      id: `${id}_r1`,
      userName: 'Isha',
      rating: 5,
      comment: 'Clear explanations and great pacing. Loved the exercises.',
      createdAt: '2026-02-18T11:20:00.000Z',
    },
    {
      id: `${id}_r2`,
      userName: 'Rohan',
      rating: 4,
      comment: 'Very practical. Would love more real-world examples in module 2.',
      createdAt: '2026-02-22T09:10:00.000Z',
    },
  ],
})

export const mockCourses: Course[] = [
  c('c_1', 'Development', 'Modern React for Product Teams', 'Ship fast, scale cleanly, and build delightful UI.'),
  c('c_2', 'Data Science', 'Data Science Foundations', 'From datasets to insights with modern tooling.'),
  c('c_3', 'Design', 'Design Systems in Practice', 'A practical playbook for consistent UI at scale.'),
  c('c_4', 'Business', 'Product Strategy for Builders', 'Make better product decisions with clarity.'),
]

export const mockSession: Session = {
  token: 'mock_token_123',
  user: mockUser,
}

export const mockPostsSeed: Post[] = [
  {
    id: 'p_1',
    authorName: 'Aarohi Mehta',
    authorTitle: 'Product Designer · Design Systems',
    authorAvatarUrl:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=256&h=256&fit=crop&crop=faces',
    content:
      'A simple trick for more consistent UI: define spacing as tokens (4/8/12/16/24...) and never improvise.',
    createdAt: nowIso(),
    likeCount: 248,
    commentCount: 19,
  },
  {
    id: 'p_2',
    authorName: 'Neel Kapoor',
    authorTitle: 'Senior Engineer · Frontend Platform',
    authorAvatarUrl:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop&crop=faces',
    content:
      'If your course pages feel slow, add skeletons + optimistic UI. Perceived performance matters.',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&fit=crop',
    createdAt: '2026-03-16T08:10:00.000Z',
    likeCount: 512,
    commentCount: 44,
  },
]

