import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field'
import axiosClient from '@/api/axios-client'
import { useBoundStore } from '@/store'
import { loginSchema, type LoginFormValues } from '@/schemas/auth-schemas'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: Location })?.from?.pathname ?? '/dashboard'
  const setAuth = useBoundStore((s) => s.setAuth)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: LoginFormValues) {
    setServerError(null)

    try {
      const { data } = await axiosClient.post('/auth/login', values)
      setAuth(data.user, data.accessToken)
      navigate(from, { replace: true })
    } catch (err: any) {
      setServerError(
        err.response?.data?.message ??
          'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <div className='flex min-h-[80vh] items-center justify-center px-4'>
      <div className='w-full max-w-sm space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Welcome back</h1>
          <p className='text-sm text-muted-foreground'>
            Log in to your account
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='email'
                    type='email'
                    aria-invalid={fieldState.invalid}
                    autoComplete='email'
                    placeholder='john@mail.com'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input
                    {...field}
                    id='password'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    autoComplete='current-password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {serverError && (
              <p className='text-sm text-destructive' role='alert'>
                {serverError}
              </p>
            )}

            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>
          </FieldGroup>
        </form>

        <p className='text-center text-sm text-muted-foreground'>
          Don't have an account?{' '}
          <Link to='/register' className='underline underline-offset-4'>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
