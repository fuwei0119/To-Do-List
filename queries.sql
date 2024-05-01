CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

INSERT INTO items (title) VALUES ('Buy milk'), ('Finish homework');

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL
);
INSERT INTO items (title, type) VALUES ('Buy milk','Today'), ('Finish homework','Week'), ('recap','Month');