import { useState } from 'react'
import { ImagePlus, PenLine } from 'lucide-react'
import { toast } from 'sonner'

import { apiCreatePost } from '../../utils/mockApi'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export function CreatePostDialog({ onCreated }: { onCreated?: () => void }) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PenLine className="h-4 w-4" />
          Create post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share an update</DialogTitle>
          <DialogDescription>Post to the community feed (mock).</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What did you learn today?"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <div className="relative">
              <ImagePlus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="pl-9" placeholder="https://…" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!content.trim()) {
                  toast.error('Write something first.')
                  return
                }
                setLoading(true)
                try {
                  await apiCreatePost({ content: content.trim(), imageUrl: imageUrl.trim() || undefined })
                  toast.success('Posted')
                  setContent('')
                  setImageUrl('')
                  setOpen(false)
                  onCreated?.()
                } catch (e) {
                  toast.error((e as Error).message ?? 'Failed to post')
                } finally {
                  setLoading(false)
                }
              }}
              disabled={loading}
            >
              {loading ? 'Posting…' : 'Post'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

