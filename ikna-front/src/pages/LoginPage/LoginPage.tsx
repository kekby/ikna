import { useState, type FormEvent } from 'react'
import { AuthLayout } from '../../features/auth/ui/AuthLayout'
import { useAuth } from '../../app/providers/useAuth'
import { Button } from '../../shared/ui/Button'
import { TextField } from '../../shared/ui/TextField'

type LoginPageProps = {
  onRegisterClick: () => void
}

export const LoginPage = ({ onRegisterClick }: LoginPageProps) => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      login({ email, password })
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Не удалось выполнить вход',
      )
    }
  }

  return (
    <AuthLayout
      title="Повторяйте материал вовремя"
      description="Войдите, чтобы продолжить работу с колодами, карточками и прогрессом обучения."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__header">
          <h2>Вход</h2>
          <p>Используйте аккаунт, созданный в этом браузере.</p>
        </div>

        <TextField
          id="login-email"
          label="Почта"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="student@example.com"
          required
          type="email"
          value={email}
        />
        <TextField
          id="login-password"
          label="Пароль"
          minLength={6}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Минимум 6 символов"
          required
          type="password"
          value={password}
        />

        {error && <p className="form-error">{error}</p>}

        <Button type="submit">Войти</Button>
        <Button onClick={onRegisterClick} variant="ghost">
          Создать аккаунт
        </Button>
      </form>
    </AuthLayout>
  )
}
