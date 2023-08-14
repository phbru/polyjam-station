import { TimeIntervalString } from "./TimeIntervalString";

export interface Availability {
  [person: string]: Array<TimeIntervalString>;
}
