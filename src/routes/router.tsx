import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { CommunityPage } from '../pages/app/CommunityPage'
import { CourseDetailPage } from '../pages/app/CourseDetailPage'
import { CoursesPage } from '../pages/app/CoursesPage'
import { DashboardPage } from '../pages/app/DashboardPage'
import { EditProfilePage } from '../pages/app/EditProfilePage'
import { LearnPage } from '../pages/app/LearnPage'
import { ProfilePage } from '../pages/app/ProfilePage'
import { SettingsPage } from '../pages/app/SettingsPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { SignupPage } from '../pages/auth/SignupPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/app/dashboard', element: <DashboardPage /> },
          { path: '/app/courses', element: <CoursesPage /> },
          { path: '/app/courses/:courseId', element: <CourseDetailPage /> },
          { path: '/app/learn/:courseId/:lessonId', element: <LearnPage /> },
          { path: '/app/community', element: <CommunityPage /> },
          { path: '/app/profile', element: <ProfilePage /> },
          { path: '/app/profile/edit', element: <EditProfilePage /> },
          { path: '/app/settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

