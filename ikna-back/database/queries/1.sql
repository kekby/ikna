SELECT id, question, position
FROM cards
WHERE deck_id = 'js-basics' AND position <= 5
ORDER BY position;
