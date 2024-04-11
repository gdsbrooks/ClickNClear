import {Track} from "types";

const SearchResult = ({track}: {track: Track}) => {
    const {id, artist, title} = track;

    return (
        <li className="track"
            onClick={() => alert(`You selected on track #${id}!`)}>
            <h3>{artist}</h3> - <h2>{title}</h2>
        </li>
    );
};

export default SearchResult;
