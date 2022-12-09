import { Stack, Divider } from "@mui/material";
import { useState } from "react";
import CelebCard from "./CelebCard";
import { CelebNote, Score, Title } from "./Text";
import { handleChoice } from "../scripts/handlers";

const spacing = 1.5;
const dividerSize = 7;
const divider = {
  borderBottomWidth: dividerSize,
  borderRightWidth: dividerSize,
  backgroundColor: "lightblue",
};

function CelebGrid(props: {
  size: number[];
  group: string;
  celebs: string[];
  height?: number;
  choiceHandler?: (selected: boolean[][], disabled: boolean[][]) => void;
  rowTitles?: string[];
  seed?: { [key: string]: string };
  splits?: number[];
}) {
  const args = {
    ...props,
    rows: props.size[0],
    columns: props.size[1],
    hSplits: props.size[0] / (props.splits ? props.splits[0] : 1),
    vSplits: props.size[1] / (props.splits ? props.splits[1] : 1),
  };

  const [selected, setSelected] = useState(
    Array.from(Array(args.rows), () => Array(args.columns).fill(false))
  );

  const [disabled, setDisabled] = useState(
    handleChoice(selected, props.choiceHandler)
  );

  const [score, setScore] = useState("");

  function updateScore() {
    const messages = [];
    for (let i = 0; i < selected.length; i++) {
      const items = [];
      for (let j = 0; j < selected[i].length; j++) {
        if (selected[i][j]) items.push(props.celebs[i * args.columns + j]);
      }
      if (items.length) {
        let msg = "";
        if (props.rowTitles) msg = "**" + props.rowTitles[i] + "**: ";
        messages.push(msg + items.join(", "));
      }
    }
    const fullMessage = messages.join("\n\n");
    navigator.clipboard.writeText(fullMessage);
    setScore(fullMessage + "\n\n#### (Selections copied to clipboard)");
  }

  function updateSelection(row: number, column: number) {
    const dummy = selected.slice();
    dummy[row][column] = !dummy[row][column];
    setSelected(dummy);

    if (props.choiceHandler != null) {
      const dummy = handleChoice(selected, props.choiceHandler);
      setDisabled(dummy);
    }

    updateScore();
  }

  function generateGrid() {
    const rows = [];

    if (props.seed) {
      rows.push(<CelebNote key="note" seed={props.seed} />);
    }

    let hCount = 0;
    for (let i = 0; i < args.rows; i++) {
      const row = [];
      if (props.rowTitles) {
        row.push(
          <Title
            key={props.rowTitles[i]}
            title={props.rowTitles[i]}
            height={props.height}
          />
        );
      }
      let vCount = 0;
      for (let j = 0; j < args.columns; j++) {
        const key = i * args.columns + j;
        const celeb = key >= props.celebs.length ? "_Blank" : props.celebs[key];
        row.push(
          <CelebCard
            key={key}
            group={props.group}
            name={celeb}
            height={props.height}
            selected={selected[i][j]}
            onSelect={() => updateSelection(i, j)}
            disabled={celeb === "_Blank" ? true : disabled[i][j]}
          ></CelebCard>
        );

        vCount++;
        if (vCount == args.vSplits && j != args.columns - 1) {
          row.push(<Divider orientation="vertical" flexItem sx={divider} />);
          vCount = 0;
        }
      }
      rows.push(
        <Stack
          direction="row"
          key={i}
          spacing={spacing}
          justifyContent="center"
          alignItems="center"
        >
          {row}
        </Stack>
      );
      hCount++;
      if (hCount == args.hSplits && i != args.rows - 1) {
        rows.push(<Divider sx={divider} variant="middle" />);
        hCount = 0;
      }
    }
    rows.push(<Score message={score} key="score" />);

    return <Stack spacing={spacing}>{rows}</Stack>;
  }

  return generateGrid();
}

export default CelebGrid;
