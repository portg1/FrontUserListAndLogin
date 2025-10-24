// ../sign-up/SignUp.jsx
import * as React from 'react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../src/context/AuthContext'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import AppTheme from '../shared-theme/AppTheme'
import ColorModeSelect from '../shared-theme/ColorModeSelect'
import { SitemarkIcon } from './components/CustomIcons'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: { width: 450 },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}))

export default function SignUp(props) {
  const { register } = useAuth()                
  const navigate = useNavigate()

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    allowExtraEmails: false,
  })
  const [touched, setTouched] = useState({})

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const errors = {
    userName:
      touched.userName && form.userName.trim().length < 1 ? 'Name is required.' : '',
    email:
      touched.email && !/\S+@\S+\.\S+/.test(form.email) ? 'Enter a valid email.' : '',
    password:
      touched.password && form.password.length < 6 ? 'Min 6 characters.' : '',
  }
  const hasErrors = !!(errors.userName || errors.email || errors.password)

  const registerMutation = useMutation({
    mutationFn: ({ userName, email, password }) =>
      register(userName, email, password),
    onSuccess: () => {
      navigate('/crud')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ userName: true, email: true, password: true })
    if (hasErrors) return
    registerMutation.mutate({
      userName: form.userName,
      email: form.email,
      password: form.password,
    })
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="userName">Full name</FormLabel>
              <TextField
                id="userName"
                name="userName"
                autoComplete="name"
                required
                fullWidth
                placeholder="Jon Snow"
                value={form.userName}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.userName)}
                helperText={errors.userName}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                fullWidth
                placeholder="your@email.com"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                placeholder="••••••"
                value={form.password}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="allowExtraEmails"
                  checked={form.allowExtraEmails}
                  onChange={onChange}
                  color="primary"
                />
              }
              label="I want to receive updates via email."
            />

            {registerMutation.isError && (
              <Alert severity="error">
                Register failed{registerMutation.error?.message ? `: ${registerMutation.error.message}` : ''}
              </Alert>
            )}

            <Button type="submit" fullWidth variant="contained" disabled={registerMutation.isLoading}>
              {registerMutation.isLoading ? '...' : 'Sign up'}
            </Button>
          </Box>

          <Divider><Typography sx={{ color: 'text.secondary' }}>or</Typography></Divider>

          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/sign-in" variant="body2" sx={{ alignSelf: 'center' }}>
              Sign in
            </Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  )
}
