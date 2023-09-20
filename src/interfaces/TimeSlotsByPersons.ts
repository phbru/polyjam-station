import { TimeInterval } from "./TimeInterval";

export interface TimeSlotsByPersons {
  [person: string]: Array<TimeInterval>;
}
