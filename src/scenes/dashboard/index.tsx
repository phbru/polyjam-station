import { songsData } from "../../data/songsData";
import { Song } from "../../interfaces/Song";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

interface SongComponentProps {
  song: Song;
}

const SongComponent = (props: SongComponentProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(checked ? "checked" : "unchecked");
  };

  return (
    <div className="song-component">
      <h4 className="song-component__name">
        {props.song.name} <Checkbox checked={checked} onChange={handleChange} />
      </h4>
      {Object.entries(props.song.performers).map(([instrument, performer]) => (
        <ul key={instrument}>
          <li>
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
  const [checkedSongs, setCheckedSongs] = useState(
    Array(songNames.length).fill(false)
  );

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
