import cors from 'cors';
import dotenv from 'dotenv';
import express, {Express, NextFunction, Request, Response} from 'express';

import {Track, TrackFilters} from 'types';
import {tracks} from '../db/tracks.json' ;

dotenv.config();

const app: Express = express()

const PORT = Number(process.env.PORT) || 8888;

const port: number = PORT;

app.use(cors({origin: 'http://localhost:5173'}))


/* ROUTES */

app.get("/tracks", (req: Request, res: Response) => {

    /* Destructure querystring filters */
    const {artist, title}: TrackFilters = req.query;

    /* Get ALL tracks */
    let data: Track[] = tracks;

    /* Given an artist name return _all_ associated tracks. */
    if (artist && typeof artist === "string") {
        data = data.filter((track) => track.artist.trim().toLowerCase().includes(artist.trim().toLowerCase()))
    }
    /* Why not filter by title too, just for kicks? -- not implemented in MVP frontend */
    if (title && typeof title === "string") {
        data = data.filter((track) => track.title.trim().toLowerCase().includes(title.trim().toLowerCase()))
    }
    /* Return filtered tracks */
    res.json(data);
});

/* Given a track id return the associated track. */
app.get("/tracks/:trackId", (req: Request, res: Response,) => {

    /*Parse trackId param to integer */
    const trackId = Number.parseInt(req.params.trackId)

    /*400: Bad Request if trackId not valid */
    if (typeof trackId !== 'number') {
        res.status(400).json({error: "INVALID_TRACK_ID"})
    }

    /*pick specific track by id (0-index shift). */
    let data: Track[] = [tracks[trackId-1]];

    /*Return array of 1 track(s) */
    res.json(data);
})

/* 404 error route */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({error: "File Not Found"});
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
