import { useContext, useState } from "react";
import {
  TimeSlotsForEveryDateContext,
  TimeSlotsForEveryDateContextProps,
} from "../contexts/TimeSlotsForEveryDateContext";
import SongSelectionColumn from "./SongSelectionColumn";
import DailyTimeSlotsColumn from "./DailyTimeSlotsColumn";
import { CheckableSong } from "../interfaces/CheckableSong";
import {
  initialPossibleIntervals,
  songListState,
} from "../scenes/dashboard/initialStates";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";

const SelectSongsSection = () => {
  useContext<TimeSlotsForEveryDateContextProps>(TimeSlotsForEveryDateContext);

  const [checkableCheckableSongList, setCheckableSongList] =
    useState<Array<CheckableSong>>(songListState);
  const [selectedMusicians, setSelectedMusicians] = useState<Set<string>>(
    new Set()
  );
  const [dailyPossibleIntervals, setPossibleIntervals] = useState<
    Array<DailyPossibleInterval>
  >(initialPossibleIntervals);

  return (
    <div className="time-slots-for-every-date-section">
      <TimeSlotsForEveryDateContext.Provider
        value={{
          checkableCheckableSongList: checkableCheckableSongList,
          setCheckableSongList,
          dailyPossibleIntervals,
          setPossibleIntervals,
          selectedMusicians,
          setSelectedMusicians,
        }}
      >
        <SongSelectionColumn />
        <DailyTimeSlotsColumn />
      </TimeSlotsForEveryDateContext.Provider>
    </div>
  );
};

export default SelectSongsSection;
