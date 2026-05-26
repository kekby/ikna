import type { Card } from '../card/types'

export type Deck = {
  id: string
  title: string
  description: string
  cards: Card[]
}
