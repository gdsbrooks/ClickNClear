
CREATE TABLE artist
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name string NOT NULL
);

CREATE TABLE track_temp
(
    id INTEGER,
    title TEXT,
    artist TEXT
);

-- IMPORT TSV of tracks into track_temp table --

INSERT INTO artist(name, id)
SELECT artist, concat(1000, row_number() OVER (ORDER BY artist ASC)) AS id
FROM (SELECT DISTINCT artist FROM track_temp ORDER BY artist ASC);

CREATE TABLE track
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist INTEGER REFERENCES artist
);

INSERT INTO track(id, title, artist)
SELECT track_temp.id, title, artist.id
FROM track_temp
JOIN artist ON track_temp.artist = artist.name
ORDER BY track_temp.id ASC;

DROP TABLE track_temp;
