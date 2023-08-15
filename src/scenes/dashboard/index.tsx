import { songsData } from "../../data/songsData";
import { availabilities } from "../../data/availabilitiesData";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { SongListElementState } from "../../interfaces/SongListElementState";
import { Availabilities } from "../../interfaces/Availabilities";
import { TimeInterval } from "../../interfaces/TimeInterval";
import {
  convertAvailabilities,
  findCumulativeOverlap,
  findPossibleIntervals,
} from "./helperFunctions";
import { Availability } from "../../interfaces/Availability";

const Dashboard = () => {
  // Data  -----------------------------------------------------
  // availabilities :
  const convertedAvailabilities: Availabilities =
    convertAvailabilities(availabilities);
  console.log(convertedAvailabilities);

  // songs :
  const songListState: Array<SongListElementState> = [];
  const allMusicians: Set<string> = new Set();
  for (const [songName, songContent] of Object.entries(songsData)) {
    songListState.push({
      songName: songName,
      checked: false,
      content: songContent,
      priority: undefined,
    });

    for (const musician of Object.values(songContent.performers)) {
      allMusicians.add(musician);
    }
  }

  console.log(
    "first day CUMULATIVE availabilities : ",
    findCumulativeOverlap(Object.values(convertedAvailabilities["2023-09-01"]))
  );

  // ------------------------------------------------------------------

  // State hooks -------------------------------------------
  //performers corresponding to selected songs
  const [selectedPerformers, setSelectedPerformers] = useState<Set<string>>(
    new Set()
  );
  // to display availabilities per date

  // state for the songs
  const [songsList, setSongsList] =
    useState<Array<SongListElementState>>(songListState);
  // ---------------------------------------------------------

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => {
    const updatedSelectedPerformers = new Set(selectedPerformers);
    const updatedSongs = [...songsList];

    updatedSongs[songIndex].checked = event.target.checked;
    setSongsList(updatedSongs);
    console.log(songsList);

    for (const performer of Object.values(
      songsList[songIndex].content.performers
    )) {
      if (event.target.checked) {
        updatedSelectedPerformers.add(performer);
      } else {
        updatedSelectedPerformers.delete(performer);
      }
    }

    setSelectedPerformers(updatedSelectedPerformers);
    console.log(updatedSelectedPerformers);
  };

  let possibleIntervals: Array<[string, null | Array<TimeInterval>]> = [];
  possibleIntervals = findPossibleIntervals(
    convertedAvailabilities,
    selectedPerformers
  );

  console.log(possibleIntervals);

  return (
    <div className="dashboard">
      <div className="song-section">
        {songsList.map((song, index) => (
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
      <div className="available-dates-section">
        <h3>Journées possibles</h3>
        {possibleIntervals.map((item) => (
          <div>
            <h4>{item[0]}</h4>
            {item[1]?.map((x, subIndex) => (
              <p key={subIndex}>
                [{x.start.toString()} , {x.end.toString()}]
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
