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
import DailyPossibilitiesSection from "../../components/PossibleIntervalsSection";
import SongSection from "../../components/SongSection";

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

  return (
    <div className="dashboard">
      <SongSection songsList={songsList} handleCheck={handleCheck} />
      <DailyPossibilitiesSection possibleIntervals={possibleIntervals} />
    </div>
  );
};

export default Dashboard;
