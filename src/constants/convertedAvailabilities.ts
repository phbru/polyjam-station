import { availabilities } from "../data/availabilitiesData";
import { AvailabilitiesByDates } from "../interfaces/AvailabilitiesByDates";
import { convertAvailabilities } from "../pages/dashboard/helpers";

export const convertedAvailabilities: AvailabilitiesByDates =
  convertAvailabilities(availabilities);
