import { songsData } from "../../data/songsData";
import { availabilities } from "../../data/availabilitiesData";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { SongListElementState } from "../../interfaces/SongListElementState";
import { Availabilities } from "../../interfaces/Availabilities";
import { TimeInterval } from "../../interfaces/TimeInterval";
import { Time } from "../../interfaces/Time";

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

function findTimeOverlap(
  interval1: TimeInterval,
  interval2: TimeInterval
): TimeInterval | null {
  if (
    interval1.end.isEarlierOrEqualTo(interval2.start) ||
    interval2.end.isEarlierOrEqualTo(interval1.start)
  ) {
    return null;
  }

  const overlapStart: Time = interval1.start.isLaterOrEqualTo(interval2.start)
    ? interval1.start
    : interval2.start;
  const overlapEnd: Time = interval1.end.isEarlierOrEqualTo(interval2.end)
    ? interval1.end
    : interval2.end;

  return { start: overlapStart, end: overlapEnd };
}

// function overlapOfTwoIntervalArrays(
//   intevalGroup1: Array<TimeInterval>,
//   intevalGroup2: Array<TimeInterval>
// ): null | Array<TimeInterval> {}

// function findCumulativeOverlap(collection of intervals){

// }

function findDatesForSelectedPerformers(
  availabilities: Availabilities,
  performers: Set<string>
): string[] {
  const selectedDates: string[] = [];

  for (const date in availabilities) {
    const availablePerformers = new Set<string>(
      Object.keys(availabilities[date])
    );

    // Check if all selected performers are available on this date
    if (
      [...performers].every((performer) => availablePerformers.has(performer))
    ) {
      selectedDates.push(date);
    }
  }

  return selectedDates;
}

const Dashboard = () => {
  //TEST
  const time11: TimeInterval = {
    start: new Time("19:00"),
    end: new Time("19:15"),
  };
  const time12: TimeInterval = {
    start: new Time("17:00"),
    end: new Time("20:00"),
  };
  console.log("TESTT 1");
  console.log(findTimeOverlap(time11, time12));

  console.log("TESTT 2");
  const time21: TimeInterval = {
    start: new Time("18:00"),
    end: new Time("20:00"),
  };
  const time22: TimeInterval = {
    start: new Time("17:00"),
    end: new Time("19:00"),
  };
  console.log(findTimeOverlap(time21, time22));
  const songListState: Array<SongListElementState> = [];
  const importedAvailabilities: Availabilities = availabilities;

  for (const [songName, songContent] of Object.entries(songsData)) {
    songListState.push({
      songName: songName,
      checked: false,
      content: songContent,
      priority: undefined,
    });
  }
  const [possibleDays, setPossibleDays] = useState<Array<string>>([]);

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

    setPossibleDays(
      findDatesForSelectedPerformers(availabilities, updatedSelectedPerformers)
    );
  };

  console.log(importedAvailabilities);

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
        {/* {[...selectedPerformers].map((item, index) => (
          <p key={index}>{item}</p>
        ))} */}

        {possibleDays.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
