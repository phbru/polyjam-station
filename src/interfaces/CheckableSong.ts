import { Song } from "./Song";

export interface CheckableSong {
  songName: string;
  checked: boolean;
  content: Song;
  priority: number | undefined;
}
