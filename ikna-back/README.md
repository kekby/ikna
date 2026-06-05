# IKNA Backend

## Состав

```txt
ikna-back/
  database/
    create_database.sql # создание базы данных
    schema.sql          # SQL-схема PostgreSQL
    seed.sql            # начальная учебная колода
  docs/
    database-design.md  # описание таблиц, ключей и связей
```

## Запуск

```bash
psql -f database/create_database.sql
psql -d ikna_cards -f database/schema.sql
psql -d ikna_cards -f database/seed.sql
```

## Основные сущности

- `decks` - учебные колоды.
- `cards` - карточки с вопросами и ответами.

Полное описание находится в [docs/database-design.md](docs/database-design.md).
