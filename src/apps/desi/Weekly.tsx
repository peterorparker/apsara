import CelebGrid, { diagonal } from "../../components/CelebGrid";
import { days, randomCelebs } from "../../scripts/utils";

const celebs28 = randomCelebs("weekly", "desi", 28);

export function Waterfall7x4() {
  return (
    <CelebGrid
      rows={7}
      columns={4}
      group="desi"
      celebs={celebs28.names}
      seed={celebs28.seed}
      height={300}
      choiceHandler={diagonal}
      rowTitles={days}
    />
  );
}
