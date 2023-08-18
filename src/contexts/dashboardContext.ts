import { createContext } from "react";
import { CheckableSong } from "../interfaces/CheckableSong";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";

export interface DashboardContextProps {
  checkableCheckableSongList: Array<CheckableSong>;
  setCheckableSongList: React.Dispatch<React.SetStateAction<CheckableSong[]>>;
  dailyPossibleIntervals: Array<DailyPossibleInterval>;
  setPossibleIntervals: React.Dispatch<
    React.SetStateAction<Array<DailyPossibleInterval>>
  >;
  selectedMusicians: Set<string>;
  setSelectedMusicians: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const DashboardContext = createContext<DashboardContextProps>({
  checkableCheckableSongList: [],
  setCheckableSongList: () => {},
  dailyPossibleIntervals: [],
  setPossibleIntervals: () => {},
  selectedMusicians: new Set(),
  setSelectedMusicians: () => {},
});
