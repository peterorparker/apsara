import { HashRouter, Route, Routes } from "react-router-dom";
import { ErrorPage, Home } from "./components/BasePages";
import { NavBar, routes } from "./components/Navigation";

export const router = (
  <HashRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}></Route>
      {routes}
    </Routes>
  </HashRouter>
);
