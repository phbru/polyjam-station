import { Song } from "./Song";

export interface SelectableSong {
  songName: string;
  isSelected: boolean;
  content: Song;
  priority: number | undefined;
}
