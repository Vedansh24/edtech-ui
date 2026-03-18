import { useEffect, useState } from 'react'
import { MessagesSquare } from 'lucide-react'

import type { Post } from '../../types'
import { apiListFeed } from '../../utils/mockApi'
import { CreatePostDialog } from '../../components/community/CreatePostDialog'
import { PostCard } from '../../components/community/PostCard'
import { EmptyState } from '../../components/empty/EmptyState'
import { PageShell } from '../../components/shell/PageShell'
import { Skeleton } from '../../components/ui/skeleton'

export function CommunityPage() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])

  const load = () => {
    setLoading(true)
    apiListFeed()
      .then(setPosts)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    apiListFeed()
      .then(setPosts)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageShell
      title="Community"
      description="Share wins, ask questions, and learn together."
      actions={<CreatePostDialog onCreated={load} />}
    >
      {loading ? (
        <div className="grid gap-4">
          <Skeleton className="h-[220px]" />
          <Skeleton className="h-[220px]" />
          <Skeleton className="h-[220px]" />
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Be the first to share an update with the community."
          icon={<MessagesSquare className="h-5 w-5" />}
        />
      ) : (
        <div className="grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </PageShell>
  )
}

