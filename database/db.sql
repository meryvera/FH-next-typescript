CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR (100) NOT NULL,
    description VARCHAR(200),
    created_on TIMESTAMP WITH TIME ZONE  DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks(title, description) VALUES ('taarea 1', 'Descripcioon 1');