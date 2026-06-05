INSERT INTO cards (id, deck_id, question, answer, position)
VALUES (
    'js-021',
    'js-basics',
    'Что такое backend?',
    'Backend - это серверная часть приложения, которая обрабатывает запросы, работает с базой данных и возвращает данные клиенту.',
    21
)
ON CONFLICT (id) DO NOTHING;

SELECT id, question, position
FROM cards
WHERE id = 'js-021';

DELETE FROM cards
WHERE id = 'js-021';

SELECT id, question, position
FROM cards
WHERE id = 'js-021';
