import { Stack } from "@mui/material";
import { useState } from "react";
import CelebCard from "./CelebCard";
import { CelebNote, Score, Title } from "./Text";
import { handleChoice } from "../scripts/handlers";

const spacing = 1.5;

function CelebGrid(props: {
  size: number[];
  group: string;
  celebs: string[];
  height?: number;
  choiceHandler?: (selected: boolean[][], disabled: boolean[][]) => void;
  rowTitles?: string[];
  seed?: { [key: string]: string };
}) {
  const args = {
    ...props,
    rows: props.size[0],
    columns: props.size[1],
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
    }
    rows.push(<Score message={score} key="score" />);

    return <Stack spacing={spacing}>{rows}</Stack>;
  }

  return generateGrid();
}

export default CelebGrid;
