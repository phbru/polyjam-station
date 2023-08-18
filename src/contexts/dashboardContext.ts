import { createContext } from "react";

import { SongListElementState } from "../interfaces/SongListElementState";
import { songsData } from "../data/songsData";
import { TimeInterval } from "../interfaces/TimeInterval";
import { Availabilities } from "../interfaces/Availabilities";
import {
  convertAvailabilities,
  findPossibleIntervals,
} from "../scenes/dashboard/helperFunctions";
import { availabilities } from "../data/availabilitiesData";

// Data  -----------------------------------------------------
// availabilities :

// songs :

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

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);
