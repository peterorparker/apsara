import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes/default";

import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {router}
    </ThemeProvider>
  </React.StrictMode>
);
