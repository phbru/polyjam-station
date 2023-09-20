export class Time {
  hours: number;
  minutes: number;

  // Constructor is a trick to enable initiation with string or (hour, minute)
  constructor(hoursOrString: number | string, minutes?: number) {
    if (typeof hoursOrString === "number" && minutes !== undefined) {
      this.hours = hoursOrString;
      this.minutes = minutes;
    } else if (typeof hoursOrString === "string") {
      const regExValidation: RegExp =
        /[0-2]?[0-9](h([0-9][0-9])?)|:([0-9][0-9])/;
      if (!regExValidation.test(hoursOrString)) {
        throw new Error("Invalid arguments");
      }
      if (hoursOrString.includes(":")) {
        [this.hours, this.minutes] = hoursOrString.split(":").map(Number);
      } else if (hoursOrString.includes("h")) {
        const timeArray = hoursOrString.split("h");
        if (timeArray[1] === "") {
          timeArray[1] = "0";
        }
        [this.hours, this.minutes] = timeArray.map(Number);
      } else {
        throw new Error("Invalid arguments");
      }

      if (
        this.hours < 0 ||
        this.hours > 23 ||
        this.minutes < 0 ||
        this.minutes > 59
      ) {
        throw new Error("Invalid arguments");
      }
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

  isEqual(hours: number, minutes: number): boolean {
    return this.hours === hours && this.minutes === minutes;
  }

  toString(): string {
    const formattedMinutes =
      this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
    return `${this.hours}:${formattedMinutes}`;
  }
}
