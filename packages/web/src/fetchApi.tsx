import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Track} from 'types';

const fetchWithAxios = async (url: string) => {
    const client: AxiosInstance = axios.create({baseURL: 'http://localhost:8080/tracks'});
    const response: AxiosResponse = await client.get(url);
    const results: Track[] = response.data;
    return results;
};

export const fetchAllTracks = async () => {
    const allTracks = await fetchWithAxios('')
    return allTracks;
};

export const fetchTrackById = async (id:number) => {
    const singleTrack = await fetchWithAxios(`/${String(id)}`)
    return singleTrack;
}

export const fetchTracksByArtist = async(artist:string ) => {
    return await fetchWithAxios(`?artist=${artist}`);
}
