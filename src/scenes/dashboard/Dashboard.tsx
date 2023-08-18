import { useContext, useState } from "react";

import DailyPossibilitiesSection from "../../components/PossibleIntervalsSection";
import SongSection from "../../components/SongSection";
import {
  DashboardContext,
  DashboardContextProps,
} from "../../contexts/dashboardContext";
import { CheckableSong } from "../../interfaces/CheckableSong";
import { TimeInterval } from "../../interfaces/TimeInterval";
import { initialPossibleIntervals, songListState } from "./initialStates";

const Dashboard = () => {
  useContext<DashboardContextProps>(DashboardContext);

  const [checkableCheckableSongList, setCheckableSongList] =
    useState<Array<CheckableSong>>(songListState);
  const [selectedMusicians, setSelectedMusicians] = useState<Set<string>>(
    new Set()
  );
  const [possibleIntervals, setPossibleIntervals] = useState<
    Array<[string, null | Array<TimeInterval>]>
  >(initialPossibleIntervals);

  return (
    <DashboardContext.Provider
      value={{
        checkableCheckableSongList: checkableCheckableSongList,
        setCheckableSongList,
        possibleIntervals,
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
