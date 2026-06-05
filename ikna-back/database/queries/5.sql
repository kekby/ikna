SELECT
    decks.id AS deck_id,
    decks.title AS deck_title,
    cards.id AS card_id,
    cards.position,
    cards.question,
    cards.answer
FROM decks
JOIN cards ON cards.deck_id = decks.id
WHERE decks.id = 'js-basics'
ORDER BY cards.position;
