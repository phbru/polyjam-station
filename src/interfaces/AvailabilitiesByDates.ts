import { TimeSlotsByPersons } from "./TimeSlotsByPersons";

export interface AvailabilitiesByDates {
  [date: string]: TimeSlotsByPersons;
}
