import { SongData } from "./SongData";

export interface SelectableSong {
  songName: string;
  isSelected: boolean;
  songContent: SongData;
  priority: number | undefined;
}
