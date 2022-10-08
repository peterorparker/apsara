import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";

import { NestedMenuItem } from "mui-nested-menu";
import { useEffect } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as React from "react";
import { useState } from "react";
import { Link, Route, useLocation } from "react-router-dom";
import { Waterfall7x4 } from "../apps/desi/Weekly";

const appPages = {
  Indian: {
    Weekly: {
      "Waterfall (7x4)": {
        path: "/desi/weekly/waterfall7x4",
        element: <Waterfall7x4 />,
      },
    },
  },
};

const externalPages: { [key: string]: string } = {
  "HD Images": "https://mega.nz/folder/fUFFhY5T#pNvUbxTC30F3KLFH_5wdXg",
};

export const routes: JSX.Element[] = [];
const titleMap: { [key: string]: string } = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateRoutes(mapping: any) {
  for (const key in mapping) {
    const value = mapping[key];
    if ("path" in value) {
      routes.push(
        <Route key={value.path} path={value.path} element={value.element} />
      );
      titleMap[value.path] = key;
    } else {
      generateRoutes(value);
    }
  }
}
generateRoutes(appPages);

export function NavBar() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<null | string>(null);
  const location = useLocation();

  useEffect(() => {
    document.title = titleMap[location.pathname] || "Home";
  }, [location]);

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
