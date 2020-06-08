CREATE TABLE places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    address TEXT NOT NULL,
    address2 TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    items TEXT NOT NULL
)