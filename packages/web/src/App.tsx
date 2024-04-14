import {useEffect, useState} from "react";
import type {Track} from "types";
import {fetchAllTracks, fetchTracksByArtist} from "./fetchApi.tsx";
import "./App.css";
import TrackCard from "./components/TrackCard.tsx";
import {Flex, Layout, Typography} from "antd";
import SearchBar from "./components/SearchBar.tsx";
import Results from "./components/Results.tsx";

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
                    setError(err)
                    setResults([])
                    console.error(error)
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
            <Layout className="layout">
                <Layout.Sider className="side-bar">
                    <SearchBar
                        inputValue={input}
                        handleChange={handleChange}
                    />
                    <Results
                        loading={loading}
                        trackId={trackId}
                        results={results}
                        handleClick={(value) => setTrackId(value)}
                        />
                </Layout.Sider>
                <Layout.Content className="content">
                    <Layout.Header className="header">

                            <Typography.Title level={1}>
                                Tracks on Tracks on Tracks
                            </Typography.Title>
                    </Layout.Header>
                    <Flex vertical justify="center" align="center">
                    {trackId > 0 && <TrackCard trackId={trackId}/>}
                    </Flex>
                </Layout.Content>
            </Layout>
        </div>
    );
}

export default App;
