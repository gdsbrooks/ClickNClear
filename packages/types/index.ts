export type Track = {
    id: number,
    artist: string,
    title: string
};

export type TrackFilters = Partial<Omit<Track, "id">>
