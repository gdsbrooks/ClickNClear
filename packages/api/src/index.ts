import cors from 'cors';
import dotenv from 'dotenv';
import express, {Express, Request, Response} from 'express';

import {tracks} from '../db/tracks.json' ;
import {Track} from 'types';

dotenv.config();

const app: Express = express()

const PORT = Number(process.env.PORT) || 8888;

const port: number = PORT;

app.use(cors({origin: 'http://localhost:3000'}))


/* ROUTES */
/* GET ALL TRACKS */
app.get("/", (request: Request, response: Response) => {
    const allTracks: Track[] = tracks;

    response.json({data: allTracks});
});

/* Given a track id return the associated track. */
app.get("/track", (request: Request, response: Response) => {
    //TODO: get track_id from request, filter JSON, return individual track.
})
/* Given an artist name return _all_ associated tracks. */
app.get("/artist", (request: Request, response: Response) => {
    //TODO: get artist from request, filter JSON, return all artists' tracks.
})

//TODO: 404 error route

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
