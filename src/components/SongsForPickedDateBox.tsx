import { useContext } from "react";

import { TimeInterval } from "../interfaces/TimeInterval";
import { SongForDate } from "../interfaces/SongForDate";
import {
  SongsForPickedDateContext,
  SongsForPickedDateContextProps,
} from "../contexts/SongsForPickedDateContext";

const SongsForPickedDateBox = () => {
  const { possibleSongsForDate, setPossibleSongsForDate } =
    useContext<SongsForPickedDateContextProps>(SongsForPickedDateContext);

  return (
    <div className="songs-for-picked-date-box">
      {possibleSongsForDate.map((song: SongForDate) => (
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
