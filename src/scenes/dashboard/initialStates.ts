import { convertedAvailabilities } from "../../constants/convertedAvailabilities";
import { convertData, parseCsvFile } from "../../data/dataLoader";

import { songsData } from "../../data/songsData";
import { CheckableSong } from "../../interfaces/CheckableSong";
import { findPossibleIntervals } from "./helpers";

export const songListState: Array<CheckableSong> = [];
export const allMusicians: Set<string> = new Set();
export const initialPossibleIntervals = findPossibleIntervals(
  convertedAvailabilities,
  new Set()
);

const parsedData = await parseCsvFile("dispos.csv");
convertData(parsedData);

for (const [songName, songContent] of Object.entries(songsData)) {
  songListState.push({
    songName: songName,
    checked: false,
    content: songContent,
    priority: undefined,
  });

  for (const musician of Object.values(songContent.musicians)) {
    allMusicians.add(musician);
  }
}
