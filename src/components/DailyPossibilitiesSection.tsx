import { useContext } from "react";

import {
  DashboardContext,
  DashboardContextProps,
} from "../contexts/dashboardContext";

const DailyPossibilitiesSection = () => {
  const { dailyPossibleIntervals } =
    useContext<DashboardContextProps>(DashboardContext);
  return (
    <div className="available-dates-section">
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

export default DailyPossibilitiesSection;