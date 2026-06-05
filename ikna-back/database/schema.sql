CREATE TABLE decks (
    id VARCHAR(80) PRIMARY KEY,
    title VARCHAR(160) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE cards (
    id VARCHAR(40) PRIMARY KEY,
    deck_id VARCHAR(80) NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    position INTEGER NOT NULL,
    CONSTRAINT cards_position_chk CHECK (position > 0)
);
