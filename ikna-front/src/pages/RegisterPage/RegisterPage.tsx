import { useState, type FormEvent } from 'react'
import { useAuth } from '../../app/providers/useAuth'
import { AuthLayout } from '../../features/auth/ui/AuthLayout'
import { Button } from '../../shared/ui/Button'
import { TextField } from '../../shared/ui/TextField'

type RegisterPageProps = {
  onLoginClick: () => void
}

export const RegisterPage = ({ onLoginClick }: RegisterPageProps) => {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      register({ name, email, password })
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Не удалось создать аккаунт',
      )
    }
  }

  return (
    <AuthLayout
      title="Создайте учебное пространство"
      description="Аккаунт пока хранится локально в браузере, чтобы можно было отработать пользовательский сценарий без backend."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__header">
          <h2>Регистрация</h2>
          <p>После регистрации вход будет выполнен автоматически.</p>
        </div>

        <TextField
          id="register-name"
          label="Имя"
          minLength={2}
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Алексей"
          required
          type="text"
          value={name}
        />
        <TextField
          id="register-email"
          label="Почта"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="student@example.com"
          required
          type="email"
          value={email}
        />
        <TextField
          id="register-password"
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

        <Button type="submit">Зарегистрироваться</Button>
        <Button onClick={onLoginClick} variant="ghost">
          Уже есть аккаунт
        </Button>
      </form>
    </AuthLayout>
  )
}
