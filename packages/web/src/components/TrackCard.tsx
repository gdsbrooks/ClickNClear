import {Track} from "types";
import {useEffect, useState} from "react";
import {fetchTrackById} from "../fetchApi.tsx";
import {Card, Flex, Typography} from "antd";
import {CustomerServiceOutlined} from "@ant-design/icons";
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

    const {id, artist, title, image} = track;

    //Hack default album cover for those that don't return
    const albumCover = image || 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'

    return (
        <Card className="track-card" hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }}>
            <Flex className="track-image" justify="space-between">
                 <img
                    alt="Album Cover"
                    src={albumCover}
                    style={{display: "block", width: 300}}
                />

                <Flex className="track-text" vertical align="center" justify="center" style={{ padding: 32 }}>
                    <Typography.Title level={3}>
                        {title}
                    </Typography.Title>
                    <Typography.Text strong>{artist}</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    );
}

export default TrackCard;
