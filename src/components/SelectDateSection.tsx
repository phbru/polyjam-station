import { useState } from "react";
import { SongsForPickedDateContext } from "../pages/dashboard/sections/selectSongsSection/SongsForPickedDateContext";
import { SongWithTimeSlots } from "../interfaces/SongWithTimeSlots";
import DatePickerBox from "./DatePickerBox";
import SongsForPickedDateBox from "./SongsForPickedDateBox";

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
