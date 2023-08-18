import { useContext, useState } from "react";

import { findPossibleIntervals } from "./helpers";
import DailyPossibilitiesSection from "../../components/PossibleIntervalsSection";
import SongSection from "../../components/SongSection";
import {
  DashboardContext,
  DashboardContextProps,
} from "../../contexts/dashboardContext";
import { SongListElementState } from "../../interfaces/SongListElementState";
import { songsData } from "../../data/songsData";
import { TimeInterval } from "../../interfaces/TimeInterval";
import { convertedAvailabilities } from "../../constants/convertedAvailabilities";

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

  useContext<DashboardContextProps>(DashboardContext);
  const [songList, setSongList] =
    useState<SongListElementState[]>(songListState);
  const [selectedPerformers, setSelectedPerformers] = useState<Set<string>>(
    new Set()
  );
  const [possibleIntervals, setPossibleIntervals] = useState<
    Array<[string, null | Array<TimeInterval>]>
  >(findPossibleIntervals(convertedAvailabilities, selectedPerformers));

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
        <SongSection />
        <DailyPossibilitiesSection />
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
