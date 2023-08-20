import DatePickerBox from "./DatePickerBox";
import SongsForPickedDateBox from "./SongsForPickedDateBox";

const SongsForADateSection = () => {
  return (
    <div className="songs-for-a-date-section">
      <DatePickerBox />
      <SongsForPickedDateBox />
    </div>
  );
};

export default SongsForADateSection;
