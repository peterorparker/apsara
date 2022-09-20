import { Stack } from "@mui/material";
import { useState } from "react";
import CelebCard from "./CelebCard";

const spacing = 1;

export function sudoku3x3(
  row: number,
  column: number,
  disabled: boolean[][],
  selected: boolean[][]
) {
  let dummy = disabled.slice();
  for (let i = 0; i < disabled.length; i++) {
    for (let j = 0; j < disabled[i].length; j++) {
      console.log(i, j, dummy[i][j], selected[i][j]);
      if (i === row || j === column) {
        if (!(i === row && j === column)) {
          dummy[i][j] = selected[row][column];
        }
      }
    }
  }
  return dummy;
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
      dummy = props.choiceHandler(row, column, disabled, selected);
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
