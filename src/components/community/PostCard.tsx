import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { toast } from 'sonner'

import type { Post } from '../../types'
import { formatCompactNumber, formatDateTime } from '../../utils/format'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-start gap-3 space-y-0">
        <Avatar>
          <AvatarImage src={post.authorAvatarUrl} alt={post.authorName} />
          <AvatarFallback>{post.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{post.authorName}</div>
          <div className="truncate text-xs text-muted-foreground">{post.authorTitle ?? 'Learner'}</div>
          <div className="mt-1 text-xs text-muted-foreground">{formatDateTime(post.createdAt)}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed">{post.content}</p>
        {post.imageUrl && (
          <div className="overflow-hidden rounded-xl border bg-muted">
            <img src={post.imageUrl} alt="" className="max-h-[420px] w-full object-cover" loading="lazy" />
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <div className="text-xs text-muted-foreground">
          {formatCompactNumber(post.likeCount)} likes · {formatCompactNumber(post.commentCount)} comments
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast('Likes are mocked (UI only).')}
            className="gap-2"
          >
            <Heart className="h-4 w-4" /> Like
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Comments are mocked (UI only).')} className="gap-2">
            <MessageCircle className="h-4 w-4" /> Comment
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Share is mocked (UI only).')} className="gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

