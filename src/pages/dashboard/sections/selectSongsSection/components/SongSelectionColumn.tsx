import Checkbox from "@mui/material/Checkbox";
import {
  SelectSongsContext,
  SelectSongsContextProps,
} from "../SelectSongsContext";
import { useContext } from "react";
import { findPossibleIntervals } from "../../../helpers";
import { availabilitiesData } from "../../../../../data/availabilitiesData";

const CheckableSongsColumn = () => {
  const {
    SelectableSongList,
    setSelectableSongList,
    setPossibleIntervals,
    selectedMusicians,
    setSelectedMusicians,
  } = useContext<SelectSongsContextProps>(SelectSongsContext);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => {
    const updatedSelectedMusicians = new Set(selectedMusicians);
    const updatedSongs = [...SelectableSongList];

    updatedSongs[songIndex].isSelected = event.target.checked;
    setSelectableSongList(updatedSongs);

    for (const musician of Object.values(
      SelectableSongList[songIndex].songData.musicians
    )) {
      if (event.target.checked) {
        updatedSelectedMusicians.add(musician);
      } else {
        updatedSelectedMusicians.delete(musician);
      }
    }
    setSelectedMusicians(updatedSelectedMusicians);

    const updatedPossibleIntervals = findPossibleIntervals(
      availabilitiesData,
      updatedSelectedMusicians
    );
    setPossibleIntervals(updatedPossibleIntervals);
  };

  return (
    <div className="song-selection-column">
      {SelectableSongList.map((song, index) => (
        <div className="song-component" key={index}>
          <h4 className="song-component__name">
            {song.songName}
            <Checkbox
              checked={song.isSelected}
              onChange={(event) => handleCheck(event, index)}
            />
          </h4>
          {Object.entries(song.songData.musicians).map(
            ([instrument, musician]) => (
              <ul key={instrument}>
                <li>
                  <strong>{instrument} :</strong>
                  {musician}
                </li>
              </ul>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckableSongsColumn;
