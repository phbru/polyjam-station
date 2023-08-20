import { useContext, useState } from "react";
import {
  TimeSlotsForEveryDateContext,
  TimeSlotsForEveryDateContextProps,
} from "../contexts/TimeSlotsForEveryDateContext";
import CheckableSongsColumn from "./CheckableSongsColumn";
import DailyTimeSlotsColumn from "./DailyTimeSlotsColumn";
import { CheckableSong } from "../interfaces/CheckableSong";
import {
  initialPossibleIntervals,
  songListState,
} from "../scenes/dashboard/initialStates";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";

const TimeSlotsForEveryDatesSection = () => {
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
        <CheckableSongsColumn />
        <DailyTimeSlotsColumn />
      </TimeSlotsForEveryDateContext.Provider>
    </div>
  );
};

export default TimeSlotsForEveryDatesSection;
