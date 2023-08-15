export class Time {
  hours: number;
  minutes: number;

  constructor(hoursOrString: number | string, minutes?: number) {
    if (typeof hoursOrString === "number" && minutes !== undefined) {
      this.hours = hoursOrString;
      this.minutes = minutes;
    } else if (typeof hoursOrString === "string") {
      [this.hours, this.minutes] = hoursOrString.split(":").map(Number);
    } else {
      throw new Error("Invalid arguments");
    }
  }

  isEarlierOrEqualTo(other: Time): boolean {
    if (this.hours < other.hours) {
      return true;
    }
    if (this.hours === other.hours && this.minutes <= other.minutes) {
      return true;
    }
    return false;
  }

  isLaterOrEqualTo(other: Time): boolean {
    if (this.hours > other.hours) {
      return true;
    }
    if (this.hours === other.hours && this.minutes >= other.minutes) {
      return true;
    }
    return false;
  }

  toString(): string {
    const formattedMinutes =
      this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
    return `${this.hours}:${formattedMinutes}`;
  }
}
