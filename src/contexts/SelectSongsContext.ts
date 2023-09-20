import { createContext } from "react";
import { SelectableSong } from "../interfaces/SelectableSong";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";

export interface SelectSongsContextProps {
  checkableCheckableSongList: Array<SelectableSong>;
  setCheckableSongList: React.Dispatch<React.SetStateAction<SelectableSong[]>>;
  dailyPossibleIntervals: Array<DailyPossibleInterval>;
  setPossibleIntervals: React.Dispatch<
    React.SetStateAction<Array<DailyPossibleInterval>>
  >;
  selectedMusicians: Set<string>;
  setSelectedMusicians: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const SelectSongsContext = createContext<SelectSongsContextProps>({
  checkableCheckableSongList: [],
  setCheckableSongList: () => {},
  dailyPossibleIntervals: [],
  setPossibleIntervals: () => {},
  selectedMusicians: new Set(),
  setSelectedMusicians: () => {},
});
