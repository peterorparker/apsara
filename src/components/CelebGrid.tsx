import { Stack } from "@mui/material";
import { useState } from "react";
import CelebCard from "./CelebCard";

const spacing = 1;

function disableFor(disabled: boolean[][], row: number, column: number) {
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
export function sudoku3x3(selected: boolean[][]) {
  let disabled = Array.from(Array(selected.length), () =>
    Array(selected[0].length).fill(false)
  );
  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      if (selected[i][j]) disableFor(disabled, i, j);
    }
  }
  return disabled;
}

function CelebGrid(props: {
  rows: number;
  columns: number;
  celebs: string[];
  height?: number;
  choiceHandler?: any;
}) {
  const [selected, setSelected] = useState(
    Array.from(Array(props.rows), () => Array(props.columns).fill(false))
  );

  const [disabled, setDisabled] = useState(
    Array.from(Array(props.rows), () => Array(props.columns).fill(false))
  );

  function updateSelection(row: number, column: number) {
    let dummy = selected.slice();
    dummy[row][column] = !dummy[row][column];
    setSelected(dummy);

    if (props.choiceHandler != null) {
      dummy = props.choiceHandler(selected);
      setDisabled(dummy);
    }
  }

  function generateGrid() {
    let rows = [];
    for (let i = 0; i < props.rows; i++) {
      let row = [];
      for (let j = 0; j < props.columns; j++) {
        let key = i * props.columns + j;
        let celeb = key >= props.celebs.length ? "Blank" : props.celebs[key];
        row.push(
          <CelebCard
            key={key}
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
        >
          {row}
        </Stack>
      );
    }
    return <Stack spacing={spacing}>{rows}</Stack>;
  }

  return generateGrid();
}

export default CelebGrid;
