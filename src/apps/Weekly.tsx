import CelebGrid from "../components/CelebGrid";
import { diagonal, sudokuMega } from "../scripts/handlers";
import { days, randomCelebs } from "../scripts/utils";

export function Waterfall7x4(props: { group: string }) {
  const size = [7, 4];
  const celebs = randomCelebs("weekly", props.group, size);

  return (
    <CelebGrid
      size={size}
      group={props.group}
      celebs={celebs.names}
      seed={celebs.seed}
      height={300}
      choiceHandler={diagonal}
      rowTitles={days}
    />
  );
}

export function Sudoku9x9(props: { group: string }) {
  const size = [9, 9];
  const celebs = randomCelebs("weekly", props.group, size);

  return (
    <CelebGrid
      size={size}
      group={props.group}
      celebs={celebs.names}
      seed={celebs.seed}
      height={250}
      choiceHandler={sudokuMega}
      splits={[3, 3]}
    />
  );
}
