import { TimeInterval } from "../interfaces/TimeInterval";

interface DailyPossibilitiesProps {
  possibleIntervals: Array<[string, null | Array<TimeInterval>]>;
}

const DailyPossibilitiesSection: React.FC<DailyPossibilitiesProps> = ({
  possibleIntervals,
}) => {
  return (
    <div className="available-dates-section">
      <h3>Journées possibles</h3>
      {possibleIntervals.map((item) => (
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
