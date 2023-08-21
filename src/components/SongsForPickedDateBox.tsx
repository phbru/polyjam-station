import { useState } from "react";
import { songsData } from "../data/songsData";

import { convertedAvailabilities } from "../constants/convertedAvailabilities";
import { findPossibleIntervals } from "../scenes/dashboard/helpers";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";
import { TimeInterval } from "../interfaces/TimeInterval";
import { SongForDate } from "../interfaces/SongForDate";

const SongsForPickedDateBox = () => {
  const [selectedDate, setSelectedDate] = useState<string>("2023-09-01");

  const updatedPossibleSongsForDate: SongForDate[] = [];

  for (const song in songsData) {
    const musicianSet = new Set(Object.values(songsData[song].musicians));

    const songTimeSlots: DailyPossibleInterval[] = findPossibleIntervals(
      { "2023-09-01": convertedAvailabilities[selectedDate] },
      musicianSet
    );

    const songTimeSlotsIntervals: Array<TimeInterval> | null =
      songTimeSlots[0][1];

    const songForDate: SongForDate = {
      songName: song,
      musicians: Object.values(songsData[song].musicians),
      possibleTimeSlots: songTimeSlotsIntervals ? songTimeSlotsIntervals : [],
    };

    updatedPossibleSongsForDate.push(songForDate);

    // setPossibleSongsForDate(updatedPossibleSongsForDate);
  }

  const [possibleSongsForDate, setPossibleSongsForDate] = useState<
    SongForDate[]
  >(updatedPossibleSongsForDate);

  return (
    <div className="songs-for-picked-date-box">
      {possibleSongsForDate.map((song: SongForDate) => (
        <div>
          <h4>{song.songName}</h4>
          {song.possibleTimeSlots?.map((timeSlot: TimeInterval) => (
            <p>
              [{timeSlot.start.toString()} , {timeSlot.end.toString()}]
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SongsForPickedDateBox;
