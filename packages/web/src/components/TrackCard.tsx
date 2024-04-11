import {Track} from "types";

const TrackCard = ({track}: {track: Track}) => {
    const {id, artist, title} = track;

    return (
        <div className="track-card">
            <div>
                <h1>#{id}</h1>
                <div>
                    <h2>{artist}</h2>
                    <h2>{title}</h2>
                </div>
            </div>
        </div>
    );
}

export default TrackCard;
