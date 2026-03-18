import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuth } from '../../hooks/useAuth'
import { PageShell } from '../../components/shell/PageShell'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'

const schema = z.object({
  name: z.string().min(2),
  title: z.string().max(60).optional(),
  location: z.string().max(60).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  bio: z.string().max(240).optional(),
})

type FormValues = z.infer<typeof schema>

export function EditProfilePage() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? '',
      title: user?.title ?? '',
      location: user?.location ?? '',
      avatarUrl: user?.avatarUrl ?? '',
      bio: user?.bio ?? '',
    },
    mode: 'onChange',
  })

  return (
    <PageShell title="Edit profile" description="Update your personal details.">
      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit((values) => {
              updateUser({
                name: values.name,
                title: values.title?.trim() || undefined,
                location: values.location?.trim() || undefined,
                avatarUrl: values.avatarUrl?.trim() || undefined,
                bio: values.bio?.trim() || undefined,
              })
              toast.success('Profile updated')
              navigate('/app/profile')
            })}
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register('name')} />
              {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Learner · Frontend" {...form.register('title')} />
              {form.formState.errors.title && <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, Country" {...form.register('location')} />
              {form.formState.errors.location && (
                <p className="text-xs text-destructive">{form.formState.errors.location.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input id="avatarUrl" placeholder="https://…" {...form.register('avatarUrl')} />
              {form.formState.errors.avatarUrl && (
                <p className="text-xs text-destructive">{form.formState.errors.avatarUrl.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="What are you learning right now?" {...form.register('bio')} />
              <div className="text-xs text-muted-foreground">{(form.watch('bio')?.length ?? 0)}/240</div>
              {form.formState.errors.bio && <p className="text-xs text-destructive">{form.formState.errors.bio.message}</p>}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button disabled={!form.formState.isValid}>Save changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageShell>
  )
}

