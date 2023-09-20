import { Time } from "../../classes/Time";
import { AvailabilitiesByDates } from "../../interfaces/AvailabilitiesByDates";
import { TimeSlotsByPersons } from "../../interfaces/TimeSlotsByPersons";

import { TimeInterval } from "../../interfaces/TimeInterval";
import { DailyPossibleInterval } from "../../types/DailyPossibleInterval";

function findOverlapBetweenTwoIntervals(
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

function findOverlapBetweenTwoIntervalGroups(
  intervalGroup1: Array<TimeInterval>,
  intervalGroup2: Array<TimeInterval>
): null | Array<TimeInterval> {
  const overlapIntervals: Array<TimeInterval> = [];

  for (const interval1 of intervalGroup1) {
    for (const interval2 of intervalGroup2) {
      const overlap = findOverlapBetweenTwoIntervals(interval1, interval2);
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
    const overlapGroups = findOverlapBetweenTwoIntervalGroups(
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

export const getAvailabilitiesFor = (
  selectedMusicians: Set<string>,
  allMusiciansAvailability: TimeSlotsByPersons
): TimeSlotsByPersons => {
  const selectedMusiciansAvailability: TimeSlotsByPersons = {};
  for (const [musician, availability] of Object.entries(
    allMusiciansAvailability
  )) {
    if (selectedMusicians.has(musician)) {
      selectedMusiciansAvailability[musician] = availability;
    }
  }
  return selectedMusiciansAvailability;
};

export const findPossibleIntervals = (
  availabilitiesData: AvailabilitiesByDates,
  selectedMusicians: Set<string>
): Array<DailyPossibleInterval> => {
  const dailyPossibleIntervals: Array<DailyPossibleInterval> = [];
  for (const date in availabilitiesData) {
    const selectedMusiciansAvailability: TimeSlotsByPersons =
      getAvailabilitiesFor(selectedMusicians, availabilitiesData[date]);
    dailyPossibleIntervals.push([
      date,
      findCumulativeOverlap(Object.values(selectedMusiciansAvailability)),
    ]);
  }

  return dailyPossibleIntervals;
};
