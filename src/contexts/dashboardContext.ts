import { createContext } from "react";
import { CheckableSong } from "../interfaces/CheckableSong";
import { TimeInterval } from "../interfaces/TimeInterval";

export interface DashboardContextProps {
  checkableCheckableSongList: Array<CheckableSong>;
  setCheckableSongList: React.Dispatch<React.SetStateAction<CheckableSong[]>>;
  possibleIntervals: Array<[string, null | Array<TimeInterval>]>;
  setPossibleIntervals: React.Dispatch<
    React.SetStateAction<Array<[string, null | Array<TimeInterval>]>>
  >;
  selectedPerformers: Set<string>;
  setSelectedPerformers: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const DashboardContext = createContext<DashboardContextProps>({
  checkableCheckableSongList: [],
  setCheckableSongList: () => {},
  possibleIntervals: [],
  setPossibleIntervals: () => {},
  selectedPerformers: new Set(),
  setSelectedPerformers: () => {},
});
