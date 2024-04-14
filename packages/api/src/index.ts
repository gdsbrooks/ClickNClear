import axios, {AxiosResponse} from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express, {Express, NextFunction, Request, Response} from 'express';
import {AppDataSource, Artist, Track} from './db'
import {ILike} from "typeorm";

dotenv.config();

const app: Express = express()

const PORT = Number(process.env.PORT) || 8888;

const port: number = PORT;

app.use(cors({origin: 'http://localhost:5173'}))

/* Initiate internals */
const internals: any = {};

internals.getAlbumCover = async (artist: string, title: string): Promise<string | null> => {
    const apiUrl = `https://ws.audioscrobbler.com//2.0/?method=track.getInfo&api_key=${process.env.LAST_FM_API_KEY}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(title)}&format=json`
    try {
        const response: AxiosResponse = await axios(apiUrl);
        const data = await response.data;
        if (data && data.track && data.track.album && data.track.album.image && data.track.album.image.length > 0) {
            return data.track.album.image.pop()['#text']; // Get the URL of the largest image available
        } else {
            return null; // No album cover found
        }
    } catch (error) {
        console.error('Error fetching album cover:', error);
        return null;
    }
};

internals.updateAlbumCover = async (trackId: number, imageUrl: string) => {
    await AppDataSource.createQueryBuilder()
        .update(Track)
        .set({image: imageUrl})
        .where("id = :trackId", {trackId})
        .execute()
};
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

    /*Parse trackId param and validate */
    const trackId = Number.parseInt(req.params.trackId)
    if (typeof trackId !== 'number') {
        res.status(400).json({error: "INVALID_TRACK_ID"})
    }

    /* Fetch one track from db */
    const track = await AppDataSource.getRepository(Track)
        .createQueryBuilder("track")
        .where("track.id = :id", {id: trackId})
        .getOne()

    /* try and find and update track image */
    if (track && track.image === null) {
        const imageUrl = await internals.getAlbumCover(track.artist, track.title)
        if (imageUrl !== null ) {
            await internals.updateAlbumCover(track.id, imageUrl)
            track.image = imageUrl;
        }
    }

    /* Send back empty array if null response */
    const data = track !== null
        ? [track]
        : [];

    /*Return  array of 1 track(s) */
    res.json(data);
})

/* 404 error route */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({error: "File Not Found"});
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
