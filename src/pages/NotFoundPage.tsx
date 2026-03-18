import { Link } from 'react-router-dom'
import { Ghost } from 'lucide-react'

import { EmptyState } from '../components/empty/EmptyState'
import { PageShell } from '../components/shell/PageShell'
import { Button } from '../components/ui/button'

export function NotFoundPage() {
  return (
    <PageShell title="404" description="This page doesn’t exist.">
      <div className="max-w-2xl">
        <EmptyState
          title="Page not found"
          description="Check the URL or go back to your dashboard."
          icon={<Ghost className="h-5 w-5" />}
        />
        <div className="mt-4 flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/app/dashboard">Go to dashboard</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/app/courses">Browse courses</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}

