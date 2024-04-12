import {useEffect, useState} from "react";
import {Track} from "types";
import {fetchAllTracks, fetchTracksByArtist} from "./fetchApi.tsx";
import "./App.css";
import TrackCard from "./components/TrackCard.tsx";

function App() {
    /* State */
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    const [results, setResults] = useState<Track[]>([]);
    const [input, setInput] = useState("");
    const [trackId, setTrackId] = useState<number>(0);
    /* Initial data fetch */
    useEffect(() => {
            const initialFetch = async () => {
                try {
                    const response = await fetchAllTracks()
                    setResults(response)
                } catch (err) {
                    setError(err.msg)
                    setResults([])
                } finally {
                    setLoading(false)
                }
            }
            initialFetch()
        }, []
    );

    /*On text input, update state and query api with artist filter*/
    const handleChange = async (value: string) => {
        setInput(value);
        const results = await fetchTracksByArtist(value);
        setResults(results)
    };

    return (
        <div className="App">
            <div className="body">
            <div className="left">
                <div className="search-bar-container">
                    <div className="input-wrapper">
                        <input
                            id="search-bar"
                            placeholder="Search by Artist..."
                            value={input}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="results">
                    {loading && (<div className="loading">Loading...</div>)}
                    {error && (<div className="error">{`HTTP Error fetching tracks: ${error}`}</div>)}
                    {results && (
                        <ul className="results-list">
                            {results && results.map((track) => {
                                return (
                                    <li key={track.id} className="track" onClick={ () => setTrackId(track.id)}>
                                        <h2>{track.artist}</h2>
                                        <h3>{track.title}</h3>
                                    </li>

                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className="right">
                {trackId === 0 && (<div className="empty-track"> Please select a track...</div>)}
                {trackId > 0 && <TrackCard trackId={trackId}/>}
            </div>
        </div>
        </div>

    )
        ;
}

export default App;
