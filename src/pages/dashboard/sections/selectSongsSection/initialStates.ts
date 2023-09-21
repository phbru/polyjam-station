import {
  convertToAvailabilitiesByDates,
  convertToSongDataByNames,
  parseCsvFile,
  parseSongs,
} from "../../../../data/dataLoader";

import { songsData } from "../../../../data/songsData";
import { SelectableSong } from "./interfaces/SelectableSong";
import { findPossibleIntervals } from "../../helpers";
import { availabilitiesData } from "../../../../data/availabilitiesData";
import { DailyPossibleInterval } from "../../../../types/DailyPossibleInterval";

export const songListState: Array<SelectableSong> = [];
export const allMusicians: Set<string> = new Set();
export const initialPossibleIntervals: Array<DailyPossibleInterval> =
  findPossibleIntervals(availabilitiesData, new Set());

const parsedData = await parseCsvFile("./data/dispos.csv");
console.log("parsedData : ", parsedData);
convertToAvailabilitiesByDates(parsedData);
console.log("parsedData : ", parsedData);

const parsedSongs = await parseSongs("./data/songs.csv");
console.log("parsedSongs : ", parsedSongs);
const songDataByNames = convertToSongDataByNames(parsedSongs);
console.log("songDataByNames : ", songDataByNames);

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
