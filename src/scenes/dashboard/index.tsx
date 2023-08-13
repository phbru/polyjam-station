import { songsData } from "../../data/songsData";
import { Song } from "../../interfaces/Song";

interface SongComponentProps {
  song: Song;
}

const SongComponent = (props: SongComponentProps) => {
  return (
    <div>
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
  const badRomance: Song = songsData["Bad Romance"];
  return (
    <div>
      <SongComponent song={badRomance} />
    </div>
  );
};

export default Dashboard;
