import { TimeInterval } from "./TimeInterval";

export interface Availability {
  [person: string]: Array<TimeInterval>;
}
