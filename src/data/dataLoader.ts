import Papa from "papaparse";
import { AvailabilitiesByDates } from "../interfaces/AvailabilitiesByDates";
import { Time } from "../classes/Time";
import { TimeInterval } from "../interfaces/TimeInterval";
import { To } from "react-router-dom";

export async function parseCsvFile(filePath: string): Promise<any[]> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Failed to fetch CSV file");
    }

    const csvString = await response.text();

    return new Promise<any[]>((resolve, reject) => {
      Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
        transformHeader: (header) => {
          // Replace empty header with a custom key (e.g., 'Date')
          return header || "Date";
        },
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(new Error("CSV parsing error: " + error.message));
        },
      });
    });
  } catch (error) {
    throw new Error("CSV fetch error: " + error.message);
  }
}

export function convertToAvailabilitiesByDates(
  dataTable: any
): AvailabilitiesByDates {
  const availabilitiesByDates: AvailabilitiesByDates = {};
  for (const row of dataTable) {
    const dateContent = {};
    for (const entry of Object.entries(row)) {
      if (entry[0] !== "Date") {
        //entry is a person
        dateContent[entry[0]] = convertUnavailabilityToAvailabilityTimeSlots(
          entry[1]
        );
        console.log(entry[1]);
        console.log(dateContent[entry[0]]);
      }
    }

    availabilitiesByDates[row["Date"]] = dateContent;
  }
  console.log("availabilitiesByDates : ", availabilitiesByDates);

  return availabilitiesByDates;
}

function convertUnavailabilityToAvailabilityTimeSlots(
  unavailableTimeIntervals: string
): Array<TimeInterval> {
  if (unavailableTimeIntervals === null) {
    return [{ start: new Time("00:00"), end: new Time("23:59") }];
  }

  const unavailabilityStringArray: string[] =
    unavailableTimeIntervals.split(";");

  const unavailabilityTimeIntervals: Array<TimeInterval> = [];
  for (const timeInterval of unavailabilityStringArray) {
    let [start, end] = timeInterval.split("-");

    if (start === "*") {
      start = "00h00";
    }

    if (end === "*") {
      end = "23h59";
    }

    unavailabilityTimeIntervals.push({
      start: new Time(start),
      end: new Time(end),
    });
  }

  return computeTimeIntervalsComplement(unavailabilityTimeIntervals);
}

function computeTimeIntervalsComplement(
  timeIntervalArray: Array<TimeInterval>
): Array<TimeInterval> {
  const timeIntervalsComplement: Array<TimeInterval> = [];

  let startOfNextTimeInterval: Time = new Time(0, 0);

  for (const timeInterval of timeIntervalArray) {
    timeIntervalsComplement.push({
      start: startOfNextTimeInterval,
      end: timeInterval.start,
    });
    startOfNextTimeInterval = timeInterval.end;
  }
  timeIntervalsComplement.push({
    start: startOfNextTimeInterval,
    end: new Time(23, 59),
  });

  return timeIntervalsComplement;
}
