import Checkbox from "@mui/material/Checkbox";
import {
  SelectSongsContext,
  SelectSongsContextProps,
} from "../contexts/SelectSongsContext";
import { useContext } from "react";
import { findPossibleIntervals } from "../scenes/dashboard/helpers";
import { convertedAvailabilities } from "../constants/convertedAvailabilities";

const CheckableSongsColumn = () => {
  const {
    checkableCheckableSongList,
    setCheckableSongList,
    setPossibleIntervals,
    selectedMusicians,
    setSelectedMusicians,
  } = useContext<SelectSongsContextProps>(SelectSongsContext);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => {
    const updatedSelectedMusicians = new Set(selectedMusicians);
    const updatedSongs = [...checkableCheckableSongList];

    updatedSongs[songIndex].isSelected = event.target.checked;
    setCheckableSongList(updatedSongs);

    for (const musician of Object.values(
      checkableCheckableSongList[songIndex].content.musicians
    )) {
      if (event.target.checked) {
        updatedSelectedMusicians.add(musician);
      } else {
        updatedSelectedMusicians.delete(musician);
      }
    }
    setSelectedMusicians(updatedSelectedMusicians);

    const updatedPossibleIntervals = findPossibleIntervals(
      convertedAvailabilities,
      updatedSelectedMusicians
    );
    setPossibleIntervals(updatedPossibleIntervals);

    console.log(updatedSongs);
    console.log(updatedSelectedMusicians);
    console.log(updatedPossibleIntervals);
  };

  return (
    <div className="checkable-songs-column">
      {checkableCheckableSongList.map((song, index) => (
        <div className="song-component" key={index}>
          <h4 className="song-component__name">
            {song.songName}
            <Checkbox
              isSelected={song.isSelected}
              onChange={(event) => handleCheck(event, index)}
            />
          </h4>
          {Object.entries(song.content.musicians).map(
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
