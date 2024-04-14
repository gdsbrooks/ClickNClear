import {List, Typography} from "antd";
import {Track} from "types";

type ResultsProps = {
    loading: boolean,
    results: Track[],
    trackId: number,
    handleClick: (trackId: number) => void
}
const Results = (props: ResultsProps) => {

    const {loading, results, trackId, handleClick} = props;

    return (
        <List className="results-list"
              loading={loading}
              dataSource={results}
              renderItem={(track) => (
                  <div className={track.id === trackId ? "list-item selected-track" : "list-item"}
                       key={track.id}
                       onClick={() => handleClick(track.id)}
                  >
                      <Typography.Title level={5}>{track.title}</Typography.Title>
                      <Typography.Text strong>{track.artist}</Typography.Text>
                  </div>

              )}
        />
    );
};

export default Results
