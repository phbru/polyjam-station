import { Song } from "./Song";

export interface SongListElementState {
  songName: string;
  checked: boolean;
  content: Song;
  priority: number;
}
