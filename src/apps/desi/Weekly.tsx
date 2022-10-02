import CelebGrid, { diagonal } from "../../components/CelebGrid";
import { days, randomCelebs } from "../../scripts/utils";

const celebs28 = randomCelebs("weekly", "desi", 28);

export function CelebPerDay() {
  return (
    <CelebGrid
      rows={7}
      columns={4}
      group="desi"
      celebs={celebs28}
      height={300}
      choiceHandler={diagonal}
      rowTitles={days}
    />
  );
}
