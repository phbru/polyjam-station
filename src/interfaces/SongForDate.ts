import { TimeInterval } from "./TimeInterval";

export interface SongForDate {
  songName: string;
  musicians: string[];
  possibleTimeSlots: Array<TimeInterval>;
}
