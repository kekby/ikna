import { useEffect, useState } from 'react'
import type { Card } from '../../entities/card/types'
import type { Deck } from '../../entities/deck/types'
import { getDeckById } from '../../features/decks/api/decksApi'
import {
  getReviewProgress,
  saveCardReviewResult,
} from '../../features/review/api/reviewApi'
import type {
  ReviewGrade,
  ReviewProgress,
} from '../../features/review/model/types'
import { Button } from '../../shared/ui/Button'

type ReviewPageProps = {
  deckId: string
  userId: string
  onBack: () => void
}

const gradeLabels: Record<ReviewGrade, string> = {
  again: 'Снова',
  hard: 'Трудно',
  good: 'Хорошо',
  easy: 'Легко',
}

const gradeDescriptions: Record<ReviewGrade, string> = {
  again: 'вернуть в конец сессии',
  hard: 'повторить завтра',
  good: 'увеличить интервал',
  easy: 'сильно увеличить интервал',
}

const gradeEntries = Object.entries(gradeLabels) as Array<
  [ReviewGrade, string]
>

const getDueCards = (deck: Deck, progress: ReviewProgress) => {
  const now = Date.now()

  return deck.cards.filter((card) => {
    const cardProgress = progress[card.id]

    return !cardProgress || new Date(cardProgress.dueAt).getTime() <= now
  })
}

export const ReviewPage = ({ deckId, onBack, userId }: ReviewPageProps) => {
  const [deck, setDeck] = useState<Deck | null>(null)
  const [progress, setProgress] = useState<ReviewProgress>({})
  const [queue, setQueue] = useState<Card[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    getDeckById(deckId)
      .then(async (nextDeck) => {
        if (!isMounted) {
          return
        }

        const nextProgress = await getReviewProgress(userId, deckId)

        if (!isMounted) {
          return
        }

        setDeck(nextDeck)
        setProgress(nextProgress)
        setQueue(getDueCards(nextDeck, nextProgress))
      })
      .catch((caughtError) => {
        if (!isMounted) {
          return
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Не удалось загрузить повторение',
        )
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [deckId, userId])

  const currentCard = queue[currentIndex]

  const stats = {
    dueCount: queue.length,
    reviewedCount: Object.keys(progress).length,
    totalCards: deck?.cards.length ?? 0,
  }

  const handleGrade = async (grade: ReviewGrade) => {
    if (!currentCard || !deck) {
      return
    }

    const nextProgress = await saveCardReviewResult(
      userId,
      deck.id,
      currentCard.id,
      grade,
    )
    const shouldRepeatNow = grade === 'again'
    const nextQueue = shouldRepeatNow ? [...queue, currentCard] : queue

    setProgress(nextProgress)
    setQueue(nextQueue)
    setIsAnswerVisible(false)
    setCurrentIndex((index) => index + 1)
  }

  if (isLoading) {
    return (
      <main className="review-page">
        <p>Загрузка колоды...</p>
      </main>
    )
  }

  if (error || !deck) {
    return (
      <main className="review-page">
        <section className="empty-state">
          <h1>Колода недоступна</h1>
          <p>{error || 'Не удалось найти данные колоды.'}</p>
          <Button onClick={onBack}>Назад</Button>
        </section>
      </main>
    )
  }

  if (!currentCard) {
    return (
      <main className="review-page">
        <section className="review-complete">
          <p className="eyebrow">{deck.title}</p>
          <h1>Повторение завершено</h1>
          <p>
            Сейчас нет карточек, которые нужно повторить. Новые карточки
            появятся здесь по мере наступления следующего интервала.
          </p>
          <div className="review-stats">
            <span>Всего карточек: {stats.totalCards}</span>
            <span>Уже встречались: {stats.reviewedCount}</span>
          </div>
          <Button onClick={onBack}>Вернуться на главную</Button>
        </section>
      </main>
    )
  }

  return (
    <main className="review-page">
      <header className="review-header">
        <div>
          <p className="eyebrow">{deck.title}</p>
          <h1>Повторение карточек</h1>
          <p>{deck.description}</p>
        </div>
        <Button onClick={onBack} variant="secondary">
          На главную
        </Button>
      </header>

      <section className="review-toolbar" aria-label="Статистика сессии">
        <span>
          Карточка {Math.min(currentIndex + 1, queue.length)} из {queue.length}
        </span>
        <span>Всего в колоде: {stats.totalCards}</span>
        <span>К повторению: {stats.dueCount}</span>
      </section>

      <section className="flashcard" key={currentCard.id} aria-live="polite">
        <div className="flashcard__label">Вопрос</div>
        <h2>{currentCard.question}</h2>
        {isAnswerVisible ? (
          <div className="flashcard__answer">
            <div className="flashcard__label">Ответ</div>
            <p>{currentCard.answer}</p>
          </div>
        ) : null}
      </section>

      {!isAnswerVisible ? (
        <div className="review-actions">
          <Button onClick={() => setIsAnswerVisible(true)}>Показать ответ</Button>
        </div>
      ) : (
        <div className="grade-grid" aria-label="Оценка знания карточки">
          {gradeEntries.map(([grade, label]) => (
            <Button
              key={grade}
              className={`grade-button grade-button--${grade}`}
              onClick={() => handleGrade(grade)}
              variant="secondary"
            >
              <span>{label}</span>
              <small>{gradeDescriptions[grade]}</small>
            </Button>
          ))}
        </div>
      )}
    </main>
  )
}
