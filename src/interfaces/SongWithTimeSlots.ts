import { TimeInterval } from "./TimeInterval";

export interface SongWithTimeSlots {
  songName: string;
  musicians: string[];
  possibleTimeSlots: Array<TimeInterval>;
}
