import { Divider, Drawer, MenuItem, MenuList, Typography } from "@mui/material";
import { Link, Route } from "react-router-dom";
import { CelebPerDay } from "../apps/desi/Weekly";

const pages = {
  Desi: {
    "Weekly - Celeb per day": {
      path: "/desi/weekly/celebperday",
      element: <CelebPerDay />,
    },
  },
};

export const routes: JSX.Element[] = [];
let idx = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateMenuList(mapping: any, key?: string) {
  idx = idx + 1;
  let childMap = mapping;
  if (key) childMap = mapping[key];
  const items = [];

  if ("path" in childMap) {
    routes.push(
      <Route key={idx} path={childMap.path} element={childMap.element} />
    );

    return (
      <MenuItem
        key={idx + "item"}
        component={Link}
        to={childMap.path}
        sx={{ width: 200 }}
      >
        {key}
      </MenuItem>
    );
  } else {
    for (const temp_key in childMap) {
      items.push(generateMenuList(childMap, temp_key));
    }
  }
  const menuList = [];
  if (key) {
    menuList.push(
      <Typography key={idx + "title"} variant="h6">
        {key}
      </Typography>
    );
    menuList.push(<MenuList key={idx + "menu"}>{items}</MenuList>);
    menuList.push(<Divider key={idx + "divider"}></Divider>);
  } else {
    menuList.push(<MenuList key="menu">{items}</MenuList>);
  }
  return menuList;
}

export function Menu() {
  return (
    <Drawer
      key="drawer"
      variant="persistent"
      open
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
      }}
    >
      {generateMenuList(pages)}
    </Drawer>
  );
}
