import { useState } from "react";
import {fetchTracksByArtist} from "../fetchApi";
import {Track} from "types";

const SearchBar = ({ setResults } : { setResults: (results: Track[]) => void }) => {
    const [input, setInput] = useState("");

    const handleChange = async (value :string) => {
        setInput(value);
        const results =  await fetchTracksByArtist(value);
        setResults(results)
    };

    return (
        <div className="input-wrapper">
            <input
                placeholder="Search by Artist..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar
