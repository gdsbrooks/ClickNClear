export type Track = {
    id: number,
    artist: string,
    title: string
    image?: string | null
};

export type TrackFilters = Partial<Omit<Track, "id">>
