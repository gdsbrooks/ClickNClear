import cors from 'cors';
import dotenv from 'dotenv';
import express, {Express, NextFunction, Request, Response} from 'express';
import {AppDataSource, Artist, Track} from './db'
import {ILike} from "typeorm";
import {TrackFilters} from 'types';
import {ILike} from "typeorm";
import {undefined} from "zod";

dotenv.config();

const app: Express = express()

const PORT = Number(process.env.PORT) || 8888;

const port: number = PORT;

app.use(cors({origin: 'http://localhost:5173'}))


/* ROUTES */

app.get("/tracks", async (req: Request, res: Response) => {

    /* Destructure querystring filters */
    const {artist}= req.query;

    // /* TYPE-ORM: Initiate QueryBuilder */
    const trackQb = AppDataSource.getRepository(Track)
        .createQueryBuilder("track");

    /*Add WHERE ILIKE artist */
    if (artist && typeof artist === "string") {
        trackQb.where({artist: ILike(`%${artist}%`)})
    }

    const data = await trackQb.getMany()

    /* Return tracks */
    res.json(data);
});

/* Given a track id return the associated track. */
app.get("/tracks/:trackId", async (req: Request, res: Response,) => {

    /*Parse trackId param to integer */
    const trackId = Number.parseInt(req.params.trackId)

    /*400: Bad Request if trackId not valid */
    if (typeof trackId !== 'number') {
        res.status(400).json({error: "INVALID_TRACK_ID"})
    }

    // /*pick specific track by id (0-index shift). */
    // let data: Track[] = [tracks[trackId-1]];

    const data = await AppDataSource.getRepository(Track)
        .createQueryBuilder("track")
        .where("track.id = :id", {id: trackId})
        .getOne()

    /*Return array of 1 track(s) */
    res.json(data);
})

/* 404 error route */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({error: "File Not Found"});
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
