DELETE FROM cards
WHERE id = 'js-021';

INSERT INTO cards (id, deck_id, question, answer, position)
VALUES (
    'js-021',
    'js-basics',
    'Что такое backend?',
    'Backend - это серверная часть приложения, которая обрабатывает запросы, работает с базой данных и возвращает данные клиенту.',
    21
);

SELECT id, deck_id, question, answer, position
FROM cards
WHERE id = 'js-021';
