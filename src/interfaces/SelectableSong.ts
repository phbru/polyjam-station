import { SongData } from "./SongData";

export interface SelectableSong {
  songName: string;
  isSelected: boolean;
  songData: SongData;
  priority: number | undefined;
}
