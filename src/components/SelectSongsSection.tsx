import { useContext, useState } from "react";
import {
  SelectSongsContext,
  SelectSongsContextProps,
} from "../contexts/SelectSongsContext";
import SongSelectionColumn from "./SongSelectionColumn";
import DailyTimeSlotsColumn from "./DailyTimeSlotsColumn";
import { SelectableSong } from "../interfaces/SelectableSong";
import {
  initialPossibleIntervals,
  songListState,
} from "../scenes/dashboard/initialStates";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";

const SelectSongsSection = () => {
  useContext<SelectSongsContextProps>(SelectSongsContext);

  const [SelectableSongList, setCheckableSongList] =
    useState<Array<SelectableSong>>(songListState);
  const [selectedMusicians, setSelectedMusicians] = useState<Set<string>>(
    new Set()
  );
  const [dailyPossibleIntervals, setPossibleIntervals] = useState<
    Array<DailyPossibleInterval>
  >(initialPossibleIntervals);

  return (
    <div className="time-slots-for-every-date-section">
      <SelectSongsContext.Provider
        value={{
          SelectableSongList: SelectableSongList,
          setCheckableSongList,
          dailyPossibleIntervals,
          setPossibleIntervals,
          selectedMusicians,
          setSelectedMusicians,
        }}
      >
        <SongSelectionColumn />
        <DailyTimeSlotsColumn />
      </SelectSongsContext.Provider>
    </div>
  );
};

export default SelectSongsSection;
