import { songsData } from "../../data/songsData";
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

  const [songsList, setSongsList] =
    useState<Array<SongListElementState>>(songListState);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    songIndex: number
  ) => {
    const updatedSongs = [...songsList];
    updatedSongs[songIndex].checked = event.target.checked;
    setSongsList(updatedSongs); // Assuming you're using React state to manage songsList
    console.log(songsList);
  };

  return (
    <div>
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
    </div>
  );
};

export default Dashboard;
