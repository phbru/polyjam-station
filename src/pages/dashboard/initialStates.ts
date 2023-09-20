import { convertedAvailabilities } from "../../constants/convertedAvailabilities";
import { convertData, parseCsvFile } from "../../data/dataLoader";

import { songsData } from "../../data/songsData";
import { SelectableSong } from "../../interfaces/SelectableSong";
import { findPossibleIntervals } from "./helpers";

export const songListState: Array<SelectableSong> = [];
export const allMusicians: Set<string> = new Set();
export const initialPossibleIntervals = findPossibleIntervals(
  convertedAvailabilities,
  new Set()
);

const parsedData = await parseCsvFile("dispos.csv");
convertData(parsedData);

for (const [songName, songData] of Object.entries(songsData)) {
  songListState.push({
    songName: songName,
    isSelected: false,
    songData: songData,
    priority: undefined,
  });

  for (const musician of Object.values(songData.musicians)) {
    allMusicians.add(musician);
  }
}
