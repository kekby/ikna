import type { Deck } from '../../../entities/deck/types'

const API_BASE_URL = '/mock-api'

export const getDeckById = async (deckId: string): Promise<Deck> => {
  const response = await fetch(`${API_BASE_URL}/decks/${deckId}.json`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить колоду')
  }

  return response.json() as Promise<Deck>
}
