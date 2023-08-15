import { songsData } from "../../data/songsData";
import { availabilities } from "../../data/availabilitiesData";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { SongListElementState } from "../../interfaces/SongListElementState";
import { Availabilities } from "../../interfaces/Availabilities";
import { TimeInterval } from "../../interfaces/TimeInterval";
import { Time } from "../../classes/Time";

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

function findTimeOverlapBetweenTwoGroups(
  intervalGroup1: Array<TimeInterval>,
  intervalGroup2: Array<TimeInterval>
): null | Array<TimeInterval> {
  const overlapIntervals: Array<TimeInterval> = [];

  for (const interval1 of intervalGroup1) {
    for (const interval2 of intervalGroup2) {
      const overlap = findTimeOverlap(interval1, interval2);
      if (overlap) {
        overlapIntervals.push(overlap);
      }
    }
  }
  if (overlapIntervals.length === 0) return null;
  return overlapIntervals;
}

function findCumulativeOverlap(
  availabilities: Array<Array<TimeInterval>>
): null | Array<TimeInterval> {
  let cumulativeOverlap: Array<TimeInterval> = [
    {
      start: new Time(0, 0),
      end: new Time(23, 59),
    },
  ];

  for (const availability of availabilities) {
    const overlapGroups = findTimeOverlapBetweenTwoGroups(
      cumulativeOverlap,
      availability
    );
    if (!overlapGroups) {
      return null;
    }
    cumulativeOverlap = overlapGroups;
  }

  return cumulativeOverlap;
}

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
  // Data  -----------------------------------------------------
  // availabilities :
  const importedAvailabilities: Availabilities = availabilities;
  const allAvailabilities: Array<Array<TimeInterval>> = [];

  // songs :
  const songListState: Array<SongListElementState> = [];
  for (const [songName, songContent] of Object.entries(songsData)) {
    songListState.push({
      songName: songName,
      checked: false,
      content: songContent,
      priority: undefined,
    });
  }
  // ------------------------------------------------------------------

  // State hooks -------------------------------------------
  //performers corresponding to selected songs
  const [selectedPerformers, setSelectedPerformers] = useState<Set<string>>(
    new Set()
  );
  // to display availabilities per date
  const [possibleIntervalsEachDay, setPossibleIntervalsEachDay] = useState<
    Array<[string, Array<TimeInterval>]>
  >([]);

  // state for the songs
  const [songsList, setSongsList] =
    useState<Array<SongListElementState>>(songListState);
  // ---------------------------------------------------------

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
      </div>
      <div className="available-dates-section">
        <h3>Journées possibles</h3>
        {possibleIntervalsEachDay.map((item) => (
          <h4>{item[0]}</h4>
          // {item[1] === undefined}
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
