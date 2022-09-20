import { Route, Routes } from "react-router-dom";
import Sudoku1 from "./apps/desi/Sudoku1";

export default function App() {
  return (
    <Routes>
      <Route path="/desi/sudoku1" element={<Sudoku1 />} />
    </Routes>
  );
}
