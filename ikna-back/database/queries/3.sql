INSERT INTO cards (id, deck_id, question, answer, position)
VALUES (
    'js-021',
    'js-basics',
    'Что такое backend?',
    'Backend - это серверная часть приложения, которая обрабатывает запросы, работает с базой данных и возвращает данные клиенту.',
    21
)
ON CONFLICT (id) DO NOTHING;

SELECT id, question, answer, position
FROM cards
WHERE id = 'js-021';

UPDATE cards
SET answer = 'Backend - это серверная часть приложения, отвечающая за обработку данных, бизнес-логику и работу с базой данных.'
WHERE id = 'js-021';

SELECT id, question, answer, position
FROM cards
WHERE id = 'js-021';
