import { Song } from "./Song";

export interface SelectableSong {
  songName: string;
  checked: boolean;
  content: Song;
  priority: number | undefined;
}
