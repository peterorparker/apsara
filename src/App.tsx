import { HashRouter, Route, Routes } from "react-router-dom";
import { ErrorPage, Home } from "./components/BasePages";
import { Menu, routes } from "./components/Menu";

export const router = (
  <HashRouter>
    <Menu></Menu>
    <Routes>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}></Route>
      {routes}
    </Routes>
  </HashRouter>
);
