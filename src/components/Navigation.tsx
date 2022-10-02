import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";

import { NestedMenuItem } from "mui-nested-menu";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as React from "react";
import { useState } from "react";
import { Link, Route } from "react-router-dom";
import { CelebPerDay } from "../apps/desi/Weekly";

const appPages = {
  Indian: {
    Weekly: {
      "Celeb per day": {
        path: "/desi/weekly/celebperday",
        element: <CelebPerDay />,
      },
    },
    Daily: {
      "Celeb per day2": {
        path: "/desi/weekly/celebperday2",
        element: <CelebPerDay />,
      },
      "Celeb per day3": {
        path: "/desi/weekly/celebperday3",
        element: <CelebPerDay />,
      },
    },
  },
  Global: {
    Weekly: {
      "Celeb per day4": {
        path: "/desi/weekly/celebperday",
        element: <CelebPerDay />,
      },
    },
  },
};

const externalPages: { [key: string]: string } = {
  "HD Images": "https://mega.nz/folder/fUFFhY5T#pNvUbxTC30F3KLFH_5wdXg",
};

export const routes: JSX.Element[] = [];
let idx = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateRoutes(mapping: any, key?: string) {
  idx = idx + 1;
  let childMap = mapping;
  if (key) childMap = mapping[key];
  if ("path" in childMap) {
    routes.push(
      <Route key={idx} path={childMap.path} element={childMap.element} />
    );
  } else {
    for (const temp_key in childMap) {
      generateRoutes(childMap, temp_key);
    }
  }
}
generateRoutes(appPages);

export function NavBar() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<null | string>(null);

  const isOpen = (group?: string) => {
    return Boolean(anchor) && group === activeGroup;
  };

  const handleOpen = (group: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
    setActiveGroup(group);
  };

  const handleClose = () => {
    setAnchor(null);
    setActiveGroup(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function generateMenu(mapping: any, level = 1, group?: string) {
    const components = [];
    if (level == 1) {
      for (const key in mapping) {
        components.push(
          <Button
            key={key + "button"}
            variant="contained"
            disableElevation
            onClick={(event) => handleOpen(key, event)}
            // onMouseOver={handleOpen}
            endIcon={<ExpandMoreIcon />}
          >
            {key}
          </Button>
        );
        components.push(
          <Menu
            key={key + "menu"}
            anchorEl={anchor}
            // elevation={0}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            open={isOpen(key)}
            onClose={handleClose}
            // MenuListProps={{
            //   "aria-labelledby": key,
            // }}
          >
            {generateMenu(mapping[key], level + 1, key)}
          </Menu>
        );
      }
      for (const key in externalPages) {
        components.push(
          <Button
            key={key + "button"}
            variant="contained"
            disableElevation
            href={externalPages[key]}
            // onClick={handleOpen}
            // onMouseOver={handleOpen}
          >
            {key}
          </Button>
        );
      }
    } else {
      for (const key in mapping) {
        const value = mapping[key];
        if ("path" in value) {
          components.push(
            <MenuItem
              color="inherit"
              key={key + "item"}
              component={Link}
              to={value.path}
              onClick={handleClose}
            >
              {key}
            </MenuItem>
          );
        } else {
          components.push(
            <NestedMenuItem
              key={key + "nested"}
              rightIcon={<NavigateNextIcon />}
              parentMenuOpen={isOpen(group)}
              label={key}
            >
              {generateMenu(value, level + 1, group)}
            </NestedMenuItem>
          );
        }
      }
    }
    return components;
  }

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar variant="dense">{generateMenu(appPages)}</Toolbar>
    </AppBar>
  );
}
