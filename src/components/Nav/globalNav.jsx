import React from "react";
import { AppBar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { useLocation } from "react-router-dom";
import HomeNav from "./homeNav";
import TurnsheetNav from "./turnsheetNav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function GlobalNav() {
  const classes = useStyles();
  let location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {location.pathname === "/" && <HomeNav />}
        {location.pathname === "/turnsheet" && <TurnsheetNav />}
      </AppBar>
    </div>
  );
}
