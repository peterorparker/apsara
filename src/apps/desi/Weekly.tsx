import CelebGrid from "../../components/CelebGrid";
import { diagonal, sudokuMega } from "../../scripts/handlers";
import { days, randomCelebs } from "../../scripts/utils";

export function Waterfall7x4() {
  const size = [7, 4];
  const celebs = randomCelebs("weekly", "desi", size);

  return (
    <CelebGrid
      size={size}
      group="desi"
      celebs={celebs.names}
      seed={celebs.seed}
      height={300}
      choiceHandler={diagonal}
      rowTitles={days}
    />
  );
}

export function Sudoku9x9() {
  const size = [9, 9];
  const celebs = randomCelebs("weekly", "desi", size);

  return (
    <CelebGrid
      size={size}
      group="desi"
      celebs={celebs.names}
      seed={celebs.seed}
      height={250}
      choiceHandler={sudokuMega}
    />
  );
}
