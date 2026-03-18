import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './hooks/useAuth'
import { router } from './routes/router'
import { Toaster } from './components/ui/sonner'

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  )
}
