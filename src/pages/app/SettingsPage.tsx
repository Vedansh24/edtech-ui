import { useState } from 'react'
import { Bell, Lock, UserRound } from 'lucide-react'
import { toast } from 'sonner'

import { PageShell } from '../../components/shell/PageShell'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

export function SettingsPage() {
  const [email, setEmail] = useState('vedan@example.com')
  const [marketing, setMarketing] = useState(true)
  const [product, setProduct] = useState(true)
  const [profilePublic, setProfilePublic] = useState(true)

  return (
    <PageShell title="Settings" description="Manage account, notifications, and privacy.">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="account" className="gap-2">
            <UserRound className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Lock className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card className="max-w-2xl">
            <CardContent className="space-y-4 p-6">
              <div className="text-sm font-semibold">Account email</div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button
                onClick={() => toast.success('Saved (mock)')}
                className="w-fit"
              >
                Save
              </Button>
              <div className="text-xs text-muted-foreground">All settings are mocked in this frontend-only demo.</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="max-w-2xl">
            <CardContent className="space-y-4 p-6">
              <div className="text-sm font-semibold">Preferences</div>
              <div className="flex items-center justify-between rounded-xl border bg-background/60 p-4">
                <div>
                  <div className="text-sm font-medium">Product updates</div>
                  <div className="text-sm text-muted-foreground">New courses and platform improvements</div>
                </div>
                <Button variant={product ? 'default' : 'outline'} size="sm" onClick={() => setProduct((v) => !v)}>
                  {product ? 'On' : 'Off'}
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-xl border bg-background/60 p-4">
                <div>
                  <div className="text-sm font-medium">Marketing</div>
                  <div className="text-sm text-muted-foreground">Occasional tips and promotions</div>
                </div>
                <Button variant={marketing ? 'default' : 'outline'} size="sm" onClick={() => setMarketing((v) => !v)}>
                  {marketing ? 'On' : 'Off'}
                </Button>
              </div>
              <Button onClick={() => toast.success('Saved (mock)')} className="w-fit">
                Save
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card className="max-w-2xl">
            <CardContent className="space-y-4 p-6">
              <div className="text-sm font-semibold">Profile visibility</div>
              <div className="flex items-center justify-between rounded-xl border bg-background/60 p-4">
                <div>
                  <div className="text-sm font-medium">Public profile</div>
                  <div className="text-sm text-muted-foreground">Allow others to view your achievements</div>
                </div>
                <Button variant={profilePublic ? 'default' : 'outline'} size="sm" onClick={() => setProfilePublic((v) => !v)}>
                  {profilePublic ? 'Public' : 'Private'}
                </Button>
              </div>
              <Button onClick={() => toast.success('Saved (mock)')} className="w-fit">
                Save
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  )
}

