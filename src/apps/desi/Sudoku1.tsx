import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import CelebGrid, { sudoku3x3 } from "../../components/CelebGrid";
import theme from "../../themes/default";

function Sudoku1() {
  useEffect(() => {
    document.title = "Desi Sudoku 1";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CelebGrid
        rows={3}
        columns={3}
        celebs={[
          "Chitrangada Singh",
          "Nushrat Bharucha",
          "Katrina Kaif",
          "Ileana D'Cruz",
          "Raima Sen",
          "Vaani Kapoor",
          "Karishma Tanna",
          "Esha Gupta",
          "Priyanka Chopra",
        ]}
        height={300}
        choiceHandler={sudoku3x3}
      />
    </ThemeProvider>
  );
}

export default Sudoku1;
