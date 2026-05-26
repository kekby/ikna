import { useAuth } from '../../app/providers/useAuth'
import { Button } from '../../shared/ui/Button'

type DashboardPageProps = {
  onStartReview: () => void
}

export const DashboardPage = ({ onStartReview }: DashboardPageProps) => {
  const { logout, user } = useAuth()

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">IKNA Cards</p>
          <h1>Добро пожаловать, {user?.name}</h1>
          <p>
            Начните повторение карточек по базовым определениям JavaScript.
            Прогресс сохраняется локально для текущего пользователя.
          </p>
        </div>
        <div className="dashboard-actions">
          <Button onClick={onStartReview}>Начать повторение</Button>
          <Button onClick={logout} variant="secondary">
            Выйти
          </Button>
        </div>
      </header>

      <section className="dashboard-grid" aria-label="Обзор обучения">
        <article className="metric-card">
          <span>Колоды</span>
          <strong>1</strong>
          <p>Подключена учебная колода по основам JavaScript.</p>
        </article>
        <article className="metric-card">
          <span>Карточки</span>
          <strong>20</strong>
          <p>Карточки загружаются из JSON через API-слой.</p>
        </article>
        <article className="metric-card">
          <span>Режим</span>
          <strong>4</strong>
          <p>Четыре оценки ответа управляют следующим интервалом.</p>
        </article>
      </section>
    </main>
  )
}
