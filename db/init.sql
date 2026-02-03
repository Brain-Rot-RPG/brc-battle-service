CREATE TABLE Battle (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    choice TEXT[],
    checkFunction TEXT
);