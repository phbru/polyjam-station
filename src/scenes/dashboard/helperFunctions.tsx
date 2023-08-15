import { Time } from "../../classes/Time";
import { Availabilities } from "../../interfaces/Availabilities";
import { AvailabilityData } from "../../interfaces/AvailabilityData";
import { TimeInterval } from "../../interfaces/TimeInterval";

function findTimeOverlap(
  interval1: TimeInterval,
  interval2: TimeInterval
): TimeInterval | null {
  if (
    interval1.end.isEarlierOrEqualTo(interval2.start) ||
    interval2.end.isEarlierOrEqualTo(interval1.start)
  ) {
    return null;
  }

  const overlapStart: Time = interval1.start.isLaterOrEqualTo(interval2.start)
    ? interval1.start
    : interval2.start;
  const overlapEnd: Time = interval1.end.isEarlierOrEqualTo(interval2.end)
    ? interval1.end
    : interval2.end;

  return { start: overlapStart, end: overlapEnd };
}

function findTimeOverlapBetweenTwoGroups(
  intervalGroup1: Array<TimeInterval>,
  intervalGroup2: Array<TimeInterval>
): null | Array<TimeInterval> {
  const overlapIntervals: Array<TimeInterval> = [];

  for (const interval1 of intervalGroup1) {
    for (const interval2 of intervalGroup2) {
      const overlap = findTimeOverlap(interval1, interval2);
      if (overlap) {
        overlapIntervals.push(overlap);
      }
    }
  }
  if (overlapIntervals.length === 0) return null;
  return overlapIntervals;
}

export function findCumulativeOverlap(
  availabilities: Array<Array<TimeInterval>>
): null | Array<TimeInterval> {
  let cumulativeOverlap: Array<TimeInterval> = [
    {
      start: new Time(0, 0),
      end: new Time(23, 59),
    },
  ];

  for (const availability of availabilities) {
    const overlapGroups = findTimeOverlapBetweenTwoGroups(
      cumulativeOverlap,
      availability
    );
    if (!overlapGroups) {
      return null;
    }
    cumulativeOverlap = overlapGroups;
  }

  return cumulativeOverlap;
}

export const convertToTime = (timeString: string): Time => {
  return new Time(timeString);
};

export const convertAvailabilities = (data: any): Availabilities => {
  const availabilityData: Availabilities = {};

  for (const date in data) {
    availabilityData[date] = {};
    const personAvailabilities = data[date];

    for (const person in personAvailabilities) {
      const ranges = personAvailabilities[person];

      availabilityData[date][person] = ranges.map((range: any) => {
        return {
          start: convertToTime(range.start),
          end: convertToTime(range.end),
        };
      });
    }
  }

  return availabilityData;
};
