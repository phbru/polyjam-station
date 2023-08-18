import { convertedAvailabilities } from "../../constants/convertedAvailabilities";
import { songsData } from "../../data/songsData";
import { CheckableSongListElementState } from "../../interfaces/CheckableSongListElementState";
import { findPossibleIntervals } from "./helpers";

export const songListState: Array<CheckableSongListElementState> = [];
export const allMusicians: Set<string> = new Set();
export const initialPossibleIntervals = findPossibleIntervals(
  convertedAvailabilities,
  new Set()
);

for (const [songName, songContent] of Object.entries(songsData)) {
  songListState.push({
    songName: songName,
    checked: false,
    content: songContent,
    priority: undefined,
  });

  for (const musician of Object.values(songContent.performers)) {
    allMusicians.add(musician);
  }
}
