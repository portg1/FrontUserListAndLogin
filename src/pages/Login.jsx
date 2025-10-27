import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuthStore from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import {
  LoginWrapper,
  Title,
  Form,
  Label,
  Input,
  Button,
  Error,
} from '../styles/Login.styles'

 

export default function Login() {
  const { login } = useAuthStore()
  const [emailOrUserName, setEmailOrUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: ({ emailOrUserName, password }) =>
      login(emailOrUserName, password),
    onSuccess: () => navigate('/posts'),
    onError: (err) => console.error('Login failed', err),
  })

  const onSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate({ emailOrUserName, password })
  }

  return (
    <LoginWrapper>
      <Title>ورود به حساب</Title>
      <Form onSubmit={onSubmit}>
        <Label>
          نام کاربری یا ایمیل
          <Input
            value={emailOrUserName}
            onChange={(e) => setEmailOrUserName(e.target.value)}
            required
          />
        </Label>

        <Label>
          رمز عبور
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Label>

        {loginMutation.isError && (
          <Error>
            {loginMutation.error?.response?.status === 401
              ? 'نام کاربری یا رمز اشتباه است'
              : 'ورود ناموفق بود'}
          </Error>
        )}

        <Button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? 'در حال ورود...' : 'ورود'}
        </Button>
      </Form>
    </LoginWrapper>
  )
}

