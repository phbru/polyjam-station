import { useState } from "react";
import { songsData } from "../data/songsData";
import { SongListData } from "../interfaces/SongListData";
import { Song } from "../interfaces/Song";

const SongsForPickedDateBox = () => {
  const [possibleSongs, setPossibleSongs] = useState<Array<Song>>(
    Object.values(songsData)
  );

  return (
    <div className="songs-for-picked-date-box">
      {possibleSongs.map((song: Song) => (
        <p>{song.name}</p>
      ))}
    </div>
  );
};

export default SongsForPickedDateBox;
