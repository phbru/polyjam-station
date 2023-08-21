import { useState } from "react";
import { SongsForPickedDateContext } from "../contexts/SongsForPickedDateContext";
import { SongForDate } from "../interfaces/SongForDate";
import DatePickerBox from "./DatePickerBox";
import SongsForPickedDateBox from "./SongsForPickedDateBox";

const SongsForADateSection = () => {
  const [possibleSongsForDate, setPossibleSongsForDate] = useState<
    SongForDate[]
  >([]);

  return (
    <div className="songs-for-a-date-section">
      <SongsForPickedDateContext.Provider
        value={{ possibleSongsForDate, setPossibleSongsForDate }}
      >
        <DatePickerBox />
        <SongsForPickedDateBox />
      </SongsForPickedDateContext.Provider>
    </div>
  );
};

export default SongsForADateSection;
