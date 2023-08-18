import { useContext, useState } from "react";

import DailyPossibilitiesSection from "../../components/DailyPossibilitiesSection";
import SongSection from "../../components/SongSection";
import {
  DashboardContext,
  DashboardContextProps,
} from "../../contexts/dashboardContext";
import { CheckableSong } from "../../interfaces/CheckableSong";

import { initialPossibleIntervals, songListState } from "./initialStates";
import { DailyPossibleInterval } from "../../types/DailyPossibleInterval";

const Dashboard = () => {
  useContext<DashboardContextProps>(DashboardContext);

  const [checkableCheckableSongList, setCheckableSongList] =
    useState<Array<CheckableSong>>(songListState);
  const [selectedMusicians, setSelectedMusicians] = useState<Set<string>>(
    new Set()
  );
  const [dailyPossibleIntervals, setPossibleIntervals] = useState<
    Array<DailyPossibleInterval>
  >(initialPossibleIntervals);

  return (
    <DashboardContext.Provider
      value={{
        checkableCheckableSongList: checkableCheckableSongList,
        setCheckableSongList,
        dailyPossibleIntervals,
        setPossibleIntervals,
        selectedMusicians,
        setSelectedMusicians,
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
