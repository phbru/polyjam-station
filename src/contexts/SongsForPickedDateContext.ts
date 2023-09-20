import { createContext } from "react";
import { SongWithTimeSlots } from "../interfaces/SongWithTimeSlots";

export interface SongsForPickedDateContextProps {
  possibleSongsForDate: SongWithTimeSlots[];
  setPossibleSongsForDate: React.Dispatch<
    React.SetStateAction<SongWithTimeSlots[]>
  >;
}

export const SongsForPickedDateContext =
  createContext<SongsForPickedDateContextProps>({
    possibleSongsForDate: [],
    setPossibleSongsForDate: () => {},
  });
