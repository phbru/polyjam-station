import { TimeInterval } from "../../../../../interfaces/TimeInterval";

export interface SongWithTimeSlots {
  songName: string;
  musicians: string[];
  possibleTimeSlots: Array<TimeInterval>;
}
