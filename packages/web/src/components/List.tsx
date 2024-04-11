import SearchResult from "./Track";

import {Track} from "types";

const SearchResultsList = ({ results }: {results: Track[]}) => {

    return (
        <ul className="results-list">
            {results.map((track) => {
                return <SearchResult track={track} key={track.id}/>;
            })}
        </ul>
    );
};

export default SearchResultsList
