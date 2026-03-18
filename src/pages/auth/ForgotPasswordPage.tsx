import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

import { apiRequestPasswordReset } from '../../utils/mockApi'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

const schema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
    mode: 'onChange',
  })

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>Reset password</CardTitle>
          <CardDescription>We’ll email you a reset link (mocked).</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(async (values) => {
              await apiRequestPasswordReset(values.email)
              toast.success('Password reset link sent (mock).')
              form.reset()
            })}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
              {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
            </div>
            <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" className="w-full">
              {form.formState.isSubmitting ? 'Sending…' : 'Send reset link'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Back to{' '}
              <Link to="/login" className="text-primary hover:underline">
                sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

