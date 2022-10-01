import { Stack } from "@mui/material";
import { useState } from "react";
import CelebCard from "./CelebCard";
import Score from "./Score";
import Title from "./Title";

const spacing = 1;

function sudokuDisable(disabled: boolean[][], row: number, column: number) {
  for (let i = 0; i < disabled.length; i++) {
    for (let j = 0; j < disabled[i].length; j++) {
      if (i === row || j === column) {
        if (!(i === row && j === column)) {
          disabled[i][j] = true;
        }
      }
    }
  }
}

export function sudoku(selected: boolean[][], disabled: boolean[][]) {
  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      if (selected[i][j]) sudokuDisable(disabled, i, j);
    }
  }
}

export function diagonal(selected: boolean[][], disabled: boolean[][]) {
  for (let i = 0; i < selected.length - 1; i++) {
    if (selected[i].every((x) => !x)) {
      for (let j = 0; j < selected[i].length; j++) {
        disabled[i + 1][j] = true;
      }
    } else {
      for (let j = 0; j < selected[i].length; j++) {
        if (!selected[i][j]) disabled[i][j] = true;
        else {
          let ids = [j - 1, j, j + 1];
          for (let k = 0; k < selected[i].length; k++)
            if (!ids.includes(k)) {
              disabled[i + 1][k] = true;
            }
        }
      }
    }
  }
}

function handleChoice(
  handler: (selected: boolean[][], disabled: boolean[][]) => void,
  selected: boolean[][]
) {
  let disabled = Array.from(Array(selected.length), () =>
    Array(selected[0].length).fill(false)
  );
  if (handler) handler(selected, disabled);
  return disabled;
}

function CelebGrid(props: {
  rows: number;
  columns: number;
  group: string;
  celebs: string[];
  height?: number;
  choiceHandler?: any;
  rowTitles?: string[];
}) {
  const [selected, setSelected] = useState(
    Array.from(Array(props.rows), () => Array(props.columns).fill(false))
  );

  const [disabled, setDisabled] = useState(
    handleChoice(props.choiceHandler, selected)
  );

  const [score, setScore] = useState("");

  function updateScore() {
    let messages = [];
    for (let i = 0; i < selected.length; i++) {
      let items = Array();
      for (let j = 0; j < selected[i].length; j++) {
        if (selected[i][j]) items.push(props.celebs[i * props.columns + j]);
      }
      if (items.length) {
        let msg = "";
        if (props.rowTitles) msg = "**" + props.rowTitles[i] + "**: ";
        messages.push(msg + items.join(", "));
      }
    }
    let fullMessage = messages.join("\n\n");
    navigator.clipboard.writeText(fullMessage);
    setScore(fullMessage + "\n\n#### (Selections copied to clipboard)");
  }

  function updateSelection(row: number, column: number) {
    let dummy = selected.slice();
    dummy[row][column] = !dummy[row][column];
    setSelected(dummy);

    if (props.choiceHandler != null) {
      let dummy = handleChoice(props.choiceHandler, selected);
      setDisabled(dummy);
    }

    updateScore();
  }

  function generateGrid() {
    let rows = [];
    for (let i = 0; i < props.rows; i++) {
      let row = [];
      if (props.rowTitles) {
        row.push(
          <Title
            key={props.rowTitles[i]}
            title={props.rowTitles[i]}
            height={props.height}
          />
        );
      }
      for (let j = 0; j < props.columns; j++) {
        let key = i * props.columns + j;
        let celeb = key >= props.celebs.length ? "Blank" : props.celebs[key];
        row.push(
          <CelebCard
            key={key}
            group={props.group}
            name={celeb}
            height={props.height}
            selected={selected[i][j]}
            onClick={() => updateSelection(i, j)}
            disabled={celeb === "Blank" ? true : disabled[i][j]}
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
