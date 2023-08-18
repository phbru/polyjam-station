import Checkbox from "@mui/material/Checkbox";
import {
  DashboardContext,
  DashboardContextProps,
} from "../contexts/dashboardContext";
import { useContext } from "react";
import { findPossibleIntervals } from "../scenes/dashboard/helpers";
import { convertedAvailabilities } from "../constants/convertedAvailabilities";

const SongSection = () => {
  const {
    checkableCheckableSongList,
    setCheckableSongList,
    setPossibleIntervals,
    selectedPerformers,
    setSelectedPerformers,
  } = useContext<DashboardContextProps>(DashboardContext);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => {
    const updatedSelectedPerformers = new Set(selectedPerformers);
    const updatedSongs = [...checkableCheckableSongList];

    updatedSongs[songIndex].checked = event.target.checked;
    setCheckableSongList(updatedSongs);

    for (const performer of Object.values(
      checkableCheckableSongList[songIndex].content.performers
    )) {
      if (event.target.checked) {
        updatedSelectedPerformers.add(performer);
      } else {
        updatedSelectedPerformers.delete(performer);
      }
    }
    setSelectedPerformers(updatedSelectedPerformers);

    const updatedPossibleIntervals = findPossibleIntervals(
      convertedAvailabilities,
      updatedSelectedPerformers
    );
    setPossibleIntervals(updatedPossibleIntervals);

    console.log(updatedSongs);
    console.log(updatedSelectedPerformers);
    console.log(updatedPossibleIntervals);
  };

  return (
    <div className="song-section">
      {checkableCheckableSongList.map((song, index) => (
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
