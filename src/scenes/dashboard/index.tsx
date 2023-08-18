import { availabilities } from "../../data/availabilitiesData";
import { useContext, useState } from "react";
import { Availabilities } from "../../interfaces/Availabilities";
import {
  convertAvailabilities,
  findPossibleIntervals,
} from "./helperFunctions";
import DailyPossibilitiesSection from "../../components/PossibleIntervalsSection";
import SongSection from "../../components/SongSection";
import {
  DashboardContext,
  DashboardContextProps,
} from "../../contexts/dashboardContext";
import { SongListElementState } from "../../interfaces/SongListElementState";
import { songsData } from "../../data/songsData";
import { TimeInterval } from "../../interfaces/TimeInterval";

const Dashboard = () => {
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

  const convertedAvailabilities: Availabilities =
    convertAvailabilities(availabilities);
  console.log(convertedAvailabilities);

  useContext<DashboardContextProps | undefined>(DashboardContext);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [songList, setSongList] =
    useState<SongListElementState[]>(songListState);
  const [selectedPerformers, setSelectedPerformers] = useState<Set<string>>(
    new Set()
  );
  const [possibleIntervals, setPossibleIntervals] = useState<
    Array<[string, null | Array<TimeInterval>]>
  >(findPossibleIntervals(convertedAvailabilities, selectedPerformers));

  //////////////////////////////////////////////////////////////////////////

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => {
    const updatedSelectedPerformers = new Set(selectedPerformers);
    const updatedSongs = [...songList];

    updatedSongs[songIndex].checked = event.target.checked;
    setSongList(updatedSongs);

    for (const performer of Object.values(
      songList[songIndex].content.performers
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
    <DashboardContext.Provider
      value={{
        songList,
        setSongList,
        possibleIntervals,
        setPossibleIntervals,
        selectedPerformers,
        setSelectedPerformers,
      }}
    >
      <div className="dashboard">
        <SongSection songList={songList} handleCheck={handleCheck} />
        <DailyPossibilitiesSection possibleIntervals={possibleIntervals} />
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
