import { useContext, useState } from "react";
import {
  SelectSongsContext,
  SelectSongsContextProps,
} from "./SelectSongsContext";
import SongSelectionColumn from "./components/SongSelectionColumn";
import DailyTimeSlotsColumn from "./components/DailyTimeSlotsColumn";
import { SelectableSong } from "./interfaces/SelectableSong";
import { initialPossibleIntervals, songListState } from "../../initialStates";
import { DailyPossibleInterval } from "../../../../types/DailyPossibleInterval";

const SelectSongsSection = () => {
  useContext<SelectSongsContextProps>(SelectSongsContext);

  const [SelectableSongList, setSelectableSongList] =
    useState<Array<SelectableSong>>(songListState);
  const [selectedMusicians, setSelectedMusicians] = useState<Set<string>>(
    new Set()
  );
  const [dailyPossibleIntervals, setPossibleIntervals] = useState<
    Array<DailyPossibleInterval>
  >(initialPossibleIntervals);

  return (
    <div className="select-songs-section">
      <SelectSongsContext.Provider
        value={{
          SelectableSongList: SelectableSongList,
          setSelectableSongList,
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
