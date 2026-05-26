export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy'

export type CardReviewProgress = {
  cardId: string
  repetitions: number
  intervalDays: number
  dueAt: string
  lastGrade: ReviewGrade
}

export type ReviewProgress = Record<string, CardReviewProgress>
