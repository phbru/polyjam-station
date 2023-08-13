import { Song } from "./Song";

// export class SongListElementState {
//   songName: string;
//   checked: boolean;
//   content: Song;
//   priority: number | undefined;

//   constructor(
//     songName: string,
//     checked: boolean,
//     content: Song,
//     priority?: number
//   ) {
//     this.songName = songName;
//     this.checked = checked;
//     this.content = content;
//     if (priority) this.priority = priority;
//   }

// }

export interface SongListElementState {
  songName: string;
  checked: boolean;
  content: Song;
  priority: number | undefined;
}
