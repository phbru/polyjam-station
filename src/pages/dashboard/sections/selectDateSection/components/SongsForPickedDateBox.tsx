import { useContext } from "react";

import { TimeInterval } from "../../../../../interfaces/TimeInterval";
import { SongWithTimeSlots } from "../interfaces/SongWithTimeSlots";
import {
  SongsForPickedDateContext,
  SongsForPickedDateContextProps,
} from "../SongsForPickedDateContext";

const SongsForPickedDateBox = () => {
  const { possibleSongsForDate, setPossibleSongsForDate } =
    useContext<SongsForPickedDateContextProps>(SongsForPickedDateContext);

  return (
    <div className="songs-for-picked-date-box">
      {possibleSongsForDate.map((song: SongWithTimeSlots) => (
        <div>
          <h4>{song.songName}</h4>
          {song.possibleTimeSlots?.map((timeSlot: TimeInterval) => (
            <p>
              [{timeSlot.start.toString()} , {timeSlot.end.toString()}]
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SongsForPickedDateBox;
