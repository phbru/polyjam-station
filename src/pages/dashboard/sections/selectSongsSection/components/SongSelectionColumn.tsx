import Checkbox from "@mui/material/Checkbox";
import {
  SelectSongsContext,
  SelectSongsContextProps,
} from "../SelectSongsContext";
import { useContext } from "react";
import { findPossibleIntervals } from "../../../helpers";

import { availabilitiesByDates } from "../../../initialStates";
import ToggleComponent from "../../../../../components/ToggleComponent";

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
      availabilitiesByDates,
      updatedSelectedMusicians
    );
    setPossibleIntervals(updatedPossibleIntervals);
  };

  return (
    <div className="song-selection-column">
      {SelectableSongList.map((song, index) => (
        <div className="selectable-song-component" key={index}>
          <ToggleComponent
            title={
              <div className="selectable-song-component__title">
                <p className="selectable-song-component__name">
                  {song.songName}
                </p>
                <Checkbox
                  className="selectable-song-component__checkbox"
                  checked={song.isSelected}
                  onChange={(event) => handleCheck(event, index)}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                />
              </div>
            }
          >
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
          </ToggleComponent>
        </div>
      ))}
    </div>
  );
};

export default CheckableSongsColumn;
