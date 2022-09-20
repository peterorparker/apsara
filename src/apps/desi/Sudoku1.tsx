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
          "Disha Patani",
          "Nushrat Bharucha",
          "Sara Ali Khan",
          "Ileana D'Cruz",
          "Raima Sen",
          "Alia Bhatt",
          "Ananya Panday",
          "Kiara Advani",
          "Anushka Sharma",
        ]}
        height={300}
        choiceHandler={sudoku3x3}
      />
    </ThemeProvider>
  );
}

export default Sudoku1;
