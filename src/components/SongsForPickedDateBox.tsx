import { useState } from "react";
import { songsData } from "../data/songsData";
import { SongListData } from "../interfaces/SongListData";
import { Song } from "../interfaces/Song";
import { availabilities } from "../data/availabilitiesData";
import { Availability } from "../interfaces/Availability";
import { convertedAvailabilities } from "../constants/convertedAvailabilities";
import { findPossibleIntervals } from "../scenes/dashboard/helpers";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";
import { TimeInterval } from "../interfaces/TimeInterval";

const SongsForPickedDateBox = () => {
  const [possibleSongs, setPossibleSongs] = useState<Array<Song>>(
    Object.values(songsData)
  );

  // const dayAvailabilities: Availability = convertedAvailabilities["2023-09-02"];
  // const transformedAvailabilities: Availability = {};

  // const musicians = songsData["Bad Romance"].musicians;
  // for (const musicianKey in musicians) {
  //   const musicianName = musicians[musicianKey];
  //   if (availabilities.hasOwnProperty(musicianName)) {
  //     transformedAvailabilities[musicianName] = dayAvailabilities[musicianName];
  //   }
  // }

  const badRomanceMusiciansSet = new Set(
    Object.values(songsData["Bad Romance"].musicians)
  );

  const badRomanceTimeSlot: DailyPossibleInterval[] = findPossibleIntervals(
    { "2023-09-01": convertedAvailabilities["2023-09-01"] },
    badRomanceMusiciansSet
  );

  return (
    <div className="songs-for-picked-date-box">
      {possibleSongs.map((song: Song) => (
        <p>{song.name}</p>
      ))}
      <h4>Bad Romance</h4>
      {badRomanceTimeSlot[0][1]?.map((timeSlot: TimeInterval, index) => (
        <p key={index}>
          [{timeSlot.start.toString()} , {timeSlot.end.toString()}]
        </p>
      ))}
    </div>
  );
};

export default SongsForPickedDateBox;
