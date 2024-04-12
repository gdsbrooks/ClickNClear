import {Track} from "types";
import {useEffect, useState} from "react";
import {fetchTrackById} from "../fetchApi.tsx";

const TrackCard = ({trackId}: { trackId: number }) => {

    /* Initalize state for track and loading boolean */
    const [track, setTrack] = useState<Track>({id: 0, artist: '', title: ''});
    const [trackLoading, setTrackLoading] = useState(true);

    /*Fetch track from API initally and each time component props (trackId) changes*/
    useEffect(() => {
        const getSingleTrack = async () => {
            const result = await fetchTrackById(trackId)
            setTrack(result[0])
            setTrackLoading(false)

        }
        /*Drive everybody crazy with an intentionally slow API call */
        setTrackLoading(true)
        getSingleTrack()
    }, [trackId]);

    const {id, artist, title} = track;

    return (

        <div className="track-card">

            {trackLoading
                ? (
                    <div>Fetching track details...
                        <br/>This API is so slow!
                        <br/>Almost like it take 1500ms each time...
                    </div>
                )
                : (
                    <div>
                        <h1>#{id}</h1>
                        <div>
                            <h2>{artist}</h2>
                            <h2>{title}</h2>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default TrackCard;
