import { useState } from "react";
import { SongsForPickedDateContext } from "./SongsForPickedDateContext";
import { SongWithTimeSlots } from "./interfaces/SongWithTimeSlots";
import DatePickerBox from "./components/DatePickerBox";
import SongsForPickedDateBox from "./components/SongsForPickedDateBox";

const SelectDateSection = () => {
  const [possibleSongsForDate, setPossibleSongsForDate] = useState<
    SongWithTimeSlots[]
  >([]);

  return (
    <div className="select-date-section">
      <SongsForPickedDateContext.Provider
        value={{ possibleSongsForDate, setPossibleSongsForDate }}
      >
        <DatePickerBox />
        <SongsForPickedDateBox />
      </SongsForPickedDateContext.Provider>
    </div>
  );
};

export default SelectDateSection;
