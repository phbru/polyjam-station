import CheckableSongsColumn from "./CheckableSongsColumn";
import DailyTimeSlotsColumn from "./DailyTimeSlotsColumn";

const TimeSlotsForEveryDatesSection = () => {
  return (
    <div className="time-slots-for-every-date-section">
      <CheckableSongsColumn />
      <DailyTimeSlotsColumn />
    </div>
  );
};

export default TimeSlotsForEveryDatesSection;
