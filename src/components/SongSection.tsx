import Checkbox from "@mui/material/Checkbox";
import { SongListElementState } from "../interfaces/SongListElementState";
interface SongListProps {
  songList: Array<SongListElementState>;
  handleCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => void;
}

const SongSection: React.FC<SongListProps> = ({ songList, handleCheck }) => {
  return (
    <div className="song-section">
      {songList.map((song, index) => (
        <div className="song-component" key={index}>
          <h4 className="song-component__name">
            {song.songName}
            <Checkbox
              checked={song.checked}
              onChange={(event) => handleCheck(event, index)}
            />
          </h4>
          {Object.entries(song.content.performers).map(
            ([instrument, performer]) => (
              <ul key={instrument}>
                <li>
                  <strong>{instrument} :</strong>
                  {performer}
                </li>
              </ul>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default SongSection;
