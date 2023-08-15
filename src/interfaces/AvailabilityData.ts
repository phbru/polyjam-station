import { TimeInterval } from "./TimeInterval";

export interface AvailabilityData {
  [key: string]: {
    [key: string]: TimeInterval[];
  };
}
