import {useEffect, useState} from "react";
import type {Track} from "types";
import {fetchAllTracks, fetchTracksByArtist} from "./fetchApi.tsx";
import "./App.css";
import TrackCard from "./components/TrackCard.tsx";
import {Flex, Layout, List, Typography} from "antd";
import SearchBar from "./components/SearchBar.tsx";

function App() {
    /* State */
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    const [results, setResults] = useState<Track[]>([]);
    const [input, setInput] = useState("");
    const [trackId, setTrackId] = useState<number>(0);
    let allTracks: Track[] = [];

    /* Initial data fetch */
    useEffect(() => {
            const initialFetch = async () => {
                try {
                    const response = await fetchAllTracks()
                    setResults(response)
                    allTracks = response;
                } catch (err) {
                    setError(err)
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
            <Layout className="layout">
                <Layout.Sider className="side-bar">
                    <SearchBar
                        inputValue={input}
                        handleChange={handleChange}
                        results={allTracks}
                    />
                    <List className="results-list"
                          loading={loading}
                          dataSource={results}
                          renderItem={(track) => (
                              <div className={track.id === trackId ? "list-item selected-track" : "list-item"}
                                   key={track.id}
                                   onClick={() => setTrackId(track.id)}
                              >
                                  <Typography.Title level={5}>{track.title}</Typography.Title>
                                  <Typography.Text strong>{track.artist}</Typography.Text>
                              </div>

                          )}
                    />
                </Layout.Sider>

                <Layout.Content className="content">
                    <Layout.Header className="header">
                        <Flex justify="space-around"
                              align="center"
                        >
                            <Typography.Title level={1}>
                                Tracks on Tracks on Tracks
                            </Typography.Title>
                        </Flex>
                    </Layout.Header>
                    <Flex vertical justify="center" align="center">
                    {trackId === 0 && (<div className="empty-track"> Please select a track...</div>)}
                    {trackId > 0 && <TrackCard trackId={trackId}/>}
                    </Flex>
                </Layout.Content>
            </Layout>
        </div>
    );
}

export default App;
