import { createHashRouter } from "react-router-dom";
import Sudoku1 from "./apps/desi/Sudoku1";
import { ErrorPage, Home } from "./components/BasePages";

export const router = createHashRouter([
  {
    path: "/desi/sudoku1",
    element: <Sudoku1 />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);
