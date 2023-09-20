import { createContext } from "react";
import { SongForDate } from "../../../../interfaces/SongForDate";

export interface SongsForPickedDateContextProps {
  possibleSongsForDate: SongForDate[];
  setPossibleSongsForDate: React.Dispatch<React.SetStateAction<SongForDate[]>>;
}

export const SongsForPickedDateContext =
  createContext<SongsForPickedDateContextProps>({
    possibleSongsForDate: [],
    setPossibleSongsForDate: () => {},
  });
