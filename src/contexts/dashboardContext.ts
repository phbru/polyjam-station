import { createContext } from "react";
import { SongListElementState } from "../interfaces/SongListElementState";
import { TimeInterval } from "../interfaces/TimeInterval";

export interface DashboardContextProps {
  songList: Array<SongListElementState>;
  setSongList: React.Dispatch<React.SetStateAction<SongListElementState[]>>;
  possibleIntervals: Array<[string, null | Array<TimeInterval>]>;
  setPossibleIntervals: React.Dispatch<
    React.SetStateAction<Array<[string, null | Array<TimeInterval>]>>
  >;
  selectedPerformers: Set<string>;
  setSelectedPerformers: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const DashboardContext = createContext<DashboardContextProps>({
  songList: [],
  setSongList: () => {},
  possibleIntervals: [],
  setPossibleIntervals: () => {},
  selectedPerformers: new Set(),
  setSelectedPerformers: () => {},
});
