import { songsData } from "../../data/songsData";
import { availabilities } from "../..data/availabilities";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { SongListElementState } from "../../interfaces/SongListElementState";

// interface SongComponentProps {
//   song: Song;
// }

// const SongComponent = (props: SongComponentProps) => {
//   const [checked, setChecked] = useState(false);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//     console.log(checked ? "checked" : "unchecked");
//   };

//   return (
//     <div className="song-component">
//       <h4 className="song-component__name">
//         {props.song.name} <Checkbox checked={checked} onChange={handleChange} />
//       </h4>
//       {Object.entries(props.song.performers).map(([instrument, performer]) => (
//         <ul key={instrument}>
//           <li>
//             <strong>{instrument} :</strong>
//             {performer}
//           </li>
//         </ul>
//       ))}
//     </div>
//   );
// };

const Dashboard = () => {
  const songListState: Array<SongListElementState> = [];

  for (const [songName, songContent] of Object.entries(songsData)) {
    songListState.push({
      songName: songName,
      checked: false,
      content: songContent,
      priority: undefined,
    });
  }

  const [selectedPerformers, setSelectedPerformers] = useState<Set<string>>(
    new Set()
  );

  const [songsList, setSongsList] =
    useState<Array<SongListElementState>>(songListState);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => {
    const updatedSelectedPerformers = new Set(selectedPerformers);
    const updatedSongs = [...songsList];

    updatedSongs[songIndex].checked = event.target.checked;
    setSongsList(updatedSongs);
    console.log(songsList);

    for (const performer of Object.values(
      songsList[songIndex].content.performers
    )) {
      if (event.target.checked) {
        updatedSelectedPerformers.add(performer);
      } else {
        updatedSelectedPerformers.delete(performer);
      }
    }

    setSelectedPerformers(updatedSelectedPerformers);
    console.log(updatedSelectedPerformers);
  };

  return (
    <div className="dashboard">
      <div className="song-section">
        {songsList.map((song, index) => (
          <div className="song-component" key={index}>
            <h4 className="song-component__name">
              {song.songName}
              <Checkbox
                checked={song.checked}
                onChange={(event) => handleCheck(event, index)}
              />
            </h4>
            {Object.entries(song.content.performers).map(
              ([instrument, performer]) => (
                <ul key={instrument}>
                  <li>
                    <strong>{instrument} :</strong>
                    {performer}
                  </li>
                </ul>
              )
            )}
          </div>
        ))}

        {/* {songNames.map((songName) => (
          <SongComponent song={songsData[songName]} />
        ))} */}
      </div>
      <div className="available-dates-section">
        <h3>Journées possibles</h3>
        {[...selectedPerformers].map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
