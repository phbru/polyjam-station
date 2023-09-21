import {
  convertToAvailabilitiesByDates,
  convertToSongDataByNames,
  parseCsvFile,
  parseSongs,
} from "../../data/dataLoader";

import { SelectableSong } from "./sections/selectSongsSection/interfaces/SelectableSong";
import { findPossibleIntervals } from "./helpers";
import { availabilitiesData } from "../../data/availabilitiesData";
import { DailyPossibleInterval } from "../../types/DailyPossibleInterval";
import { AvailabilitiesByDates } from "../../interfaces/AvailabilitiesByDates";

export const songListState: Array<SelectableSong> = [];
export const allMusicians: Set<string> = new Set();
export const initialPossibleIntervals: Array<DailyPossibleInterval> =
  findPossibleIntervals(availabilitiesData, new Set());

const parsedData = await parseCsvFile("./data/dispos.csv");
export const availabilitiesByDates: AvailabilitiesByDates =
  convertToAvailabilitiesByDates(parsedData);
console.log("availabilitiesByDates : ", availabilitiesByDates);

const parsedSongs = await parseSongs("./data/songs.csv");
export const songDataByNames = convertToSongDataByNames(parsedSongs);
console.log("songDataByNames : ", songDataByNames);

for (const [songName, songData] of Object.entries(songDataByNames)) {
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
