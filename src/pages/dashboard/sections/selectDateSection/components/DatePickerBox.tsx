import { ChangeEvent, useContext, useState } from "react";
import {
  SongsForPickedDateContext,
  SongsForPickedDateContextProps,
} from "../SongsForPickedDateContext";
import { SongWithTimeSlots } from "../interfaces/SongWithTimeSlots";
import { DailyPossibleInterval } from "../../../../../types/DailyPossibleInterval";
import { findPossibleIntervals } from "../../../helpers";
import { TimeInterval } from "../../../../../interfaces/TimeInterval";
import { Button } from "@mui/material";

import { availabilitiesByDates, songDataByNames } from "../../../initialStates";

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

    for (const song in songDataByNames) {
      const musicianSet = new Set(
        Object.values(songDataByNames[song].musicians)
      );

      const songTimeSlots: DailyPossibleInterval[] = findPossibleIntervals(
        { selectedDate: availabilitiesByDates[selectedDate] },
        musicianSet
      );

      const songTimeSlotsIntervals: Array<TimeInterval> | null =
        songTimeSlots[0][1];

      const songForDate: SongWithTimeSlots = {
        songName: song,
        musicians: Object.values(songDataByNames[song].musicians),
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
