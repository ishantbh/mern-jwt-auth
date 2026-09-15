// client/src/pages/Register.tsx
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
import { registerSchema, type RegisterFormValues } from '@/schemas/auth-schemas'

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: Location })?.from?.pathname ?? '/dashboard'
  const setAuth = useBoundStore((s) => s.setAuth)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null)

    try {
      const { data } = await axiosClient.post('/auth/register', values)
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
    <div className='flex-1 flex min-h-[80vh] items-center justify-center px-4'>
      <div className='w-full max-w-sm space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Create an account</h1>
          <p className='text-sm text-muted-foreground'>
            Get started in seconds
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='username'>Username</FieldLabel>
                  <Input
                    {...field}
                    id='username'
                    aria-invalid={fieldState.invalid}
                    autoComplete='username'
                    placeholder='john213'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
                    autoComplete='new-password'
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
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </FieldGroup>
        </form>

        <p className='text-center text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link to='/login' className='underline underline-offset-4'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
