import type { ReviewGrade, ReviewProgress } from '../model/types'

const reviewProgressByScope = new Map<string, ReviewProgress>()

const getProgressScope = (userId: string, deckId: string) => {
  return `${userId}:${deckId}`
}

const getNextIntervalDays = (
  grade: ReviewGrade,
  currentIntervalDays: number,
) => {
  if (grade === 'again') {
    return 0
  }

  if (grade === 'hard') {
    return Math.max(1, currentIntervalDays)
  }

  if (grade === 'good') {
    return currentIntervalDays === 0 ? 1 : currentIntervalDays * 2
  }

  return currentIntervalDays === 0 ? 3 : currentIntervalDays * 3
}

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)

  return nextDate
}

export const getReviewProgress = async (
  userId: string,
  deckId: string,
): Promise<ReviewProgress> => {
  const progress = reviewProgressByScope.get(getProgressScope(userId, deckId))

  return progress ?? {}
}

export const saveCardReviewResult = async (
  userId: string,
  deckId: string,
  cardId: string,
  grade: ReviewGrade,
): Promise<ReviewProgress> => {
  const scope = getProgressScope(userId, deckId)
  const progress = reviewProgressByScope.get(scope) ?? {}
  const currentCardProgress = progress[cardId]
  const intervalDays = getNextIntervalDays(
    grade,
    currentCardProgress?.intervalDays ?? 0,
  )

  const nextProgress: ReviewProgress = {
    ...progress,
    [cardId]: {
      cardId,
      repetitions: (currentCardProgress?.repetitions ?? 0) + 1,
      intervalDays,
      dueAt: addDays(new Date(), intervalDays).toISOString(),
      lastGrade: grade,
    },
  }

  reviewProgressByScope.set(scope, nextProgress)

  return nextProgress
}
