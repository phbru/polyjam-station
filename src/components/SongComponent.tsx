// interface SongComponentProps {
//   song: Song;
// }

// const SongComponent = (props: SongComponentProps) => {
//   const [isSelected, setChecked] = useState(false);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.isSelected);
//     console.log(isSelected ? "isSelected" : "unchecked");
//   };

//   return (
//     <div className="song-component">
//       <h4 className="song-component__name">
//         {props.song.name} <Checkbox isSelected={isSelected} onChange={handleChange} />
//       </h4>
//       {Object.entries(props.song.musicians).map(([instrument, musician]) => (
//         <ul key={instrument}>
//           <li>
//             <strong>{instrument} :</strong>
//             {musician}
//           </li>
//         </ul>
//       ))}
//     </div>
//   );
// };
