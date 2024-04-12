import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Track} from 'types';

export const fetchWithAxios = async (url: string) => {
    const client: AxiosInstance = axios.create({baseURL: 'http://localhost:8080/tracks'});
    const response: AxiosResponse = await client.get(url);
    const results: Track[] = response.data;
    return results;
};

export const fetchAllTracks = async (): Promise<Track[]> => {
    const allTracks =  await fetchWithAxios('');
    return allTracks;
};

export const fetchTrackById = async (id:number):Promise<Track[]> => {
    const tracks = await fetchWithAxios(`/${String(id)}`)
    return tracks;
}

export const fetchTracksByArtist = async(artist:string ): Promise<Track[]> => {
    return await fetchWithAxios(`?artist=${artist}`);
}
