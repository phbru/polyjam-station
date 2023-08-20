import { useContext } from "react";

import {
  TimeSlotsForEveryDateContext,
  TimeSlotsForEveryDateContextProps,
} from "../contexts/TimeSlotsForEveryDateContext";

const DailyTimeSlotsColumn = () => {
  const { dailyPossibleIntervals } =
    useContext<TimeSlotsForEveryDateContextProps>(TimeSlotsForEveryDateContext);
  return (
    <div className="daily-time-slots-column">
      <h3>Journées possibles</h3>
      {dailyPossibleIntervals.map((item) => (
        <div key={item[0]}>
          <h4>{item[0]}</h4>
          {item[1]?.map((x, subIndex) => (
            <p key={subIndex}>
              [{x.start.toString()} , {x.end.toString()}]
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DailyTimeSlotsColumn;
