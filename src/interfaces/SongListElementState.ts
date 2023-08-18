import { Song } from "./Song";

export interface CheckableSongListElementState {
  songName: string;
  checked: boolean;
  content: Song;
  priority: number | undefined;
}
