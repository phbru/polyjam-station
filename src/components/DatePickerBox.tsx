import { ChangeEvent, useContext, useState } from "react";
import {
  SongsForPickedDateContext,
  SongsForPickedDateContextProps,
} from "../contexts/SongsForPickedDateContext";
import { SongWithTimeSlots } from "../interfaces/SongWithTimeSlots";
import { songsData } from "../data/songsData";
import { DailyPossibleInterval } from "../types/DailyPossibleInterval";
import { findPossibleIntervals } from "../pages/dashboard/helpers";
import { TimeInterval } from "../interfaces/TimeInterval";
import { Button } from "@mui/material";
import { availabilitiesData } from "../data/availabilitiesData";

const DatePickerBox = () => {
  const { possibleSongsForDate, setPossibleSongsForDate } =
    useContext<SongsForPickedDateContextProps>(SongsForPickedDateContext);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedSelectedDate = e.target.value;
    setSelectedDate(updatedSelectedDate);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      console.log("e.key", e.key);
      handlePress();
    }
  };
  const handlePress = () => {
    const updatedPossibleSongsForDate: SongWithTimeSlots[] = [];

    for (const song in songsData) {
      const musicianSet = new Set(Object.values(songsData[song].musicians));

      const songTimeSlots: DailyPossibleInterval[] = findPossibleIntervals(
        { selectedDate: availabilitiesData[selectedDate] },
        musicianSet
      );

      const songTimeSlotsIntervals: Array<TimeInterval> | null =
        songTimeSlots[0][1];

      const songForDate: SongWithTimeSlots = {
        songName: song,
        musicians: Object.values(songsData[song].musicians),
        possibleTimeSlots: songTimeSlotsIntervals ? songTimeSlotsIntervals : [],
      };

      updatedPossibleSongsForDate.push(songForDate);

      setPossibleSongsForDate(updatedPossibleSongsForDate);
    }
  };

  return (
    <div className="date-picker-box">
      <input
        name="date-input"
        value={selectedDate}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handlePress}> Search</Button>

      <hr />
    </div>
  );
};

export default DatePickerBox;
