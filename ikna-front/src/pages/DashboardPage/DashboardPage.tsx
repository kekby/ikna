import { useAuth } from '../../app/providers/useAuth'
import { Button } from '../../shared/ui/Button'

export const DashboardPage = () => {
  const { logout, user } = useAuth()

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">IKNA Cards</p>
          <h1>Добро пожаловать, {user?.name}</h1>
          <p>Базовая авторизация работает. Следующий шаг: колоды и карточки.</p>
        </div>
        <Button onClick={logout} variant="secondary">
          Выйти
        </Button>
      </header>

      <section className="dashboard-grid" aria-label="Обзор обучения">
        <article className="metric-card">
          <span>Колоды</span>
          <strong>0</strong>
          <p>Здесь появятся тематические наборы карточек.</p>
        </article>
        <article className="metric-card">
          <span>Карточки</span>
          <strong>0</strong>
          <p>Вопросы и ответы будут привязаны к выбранной колоде.</p>
        </article>
        <article className="metric-card">
          <span>К повторению</span>
          <strong>0</strong>
          <p>Позже сюда попадут карточки по интервальному алгоритму.</p>
        </article>
      </section>
    </main>
  )
}
