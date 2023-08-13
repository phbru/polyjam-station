import { songsData } from "../../data/songsData";
import { Song } from "../../interfaces/Song";

interface SongComponentProps {
  song: Song;
}

const SongComponent = (props: SongComponentProps) => {
  return (
    <div className="song-component">
      <h4 className="song-component__name">{props.song.name}</h4>
      {Object.entries(props.song.performers).map(([instrument, performer]) => (
        <ul>
          <li key={instrument}>
            <strong>{instrument} :</strong>
            {performer}
          </li>
        </ul>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const songNames: string[] = Object.keys(songsData);
  return (
    <div>
      <div className="song-section">
        {songNames.map((songName) => (
          <SongComponent song={songsData[songName]} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
