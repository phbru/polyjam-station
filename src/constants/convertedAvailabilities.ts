import { availabilities } from "../data/availabilitiesData";
import { Availabilities } from "../interfaces/Availabilities";
import { convertAvailabilities } from "../scenes/dashboard/helpers";

export const convertedAvailabilities: Availabilities =
  convertAvailabilities(availabilities);
