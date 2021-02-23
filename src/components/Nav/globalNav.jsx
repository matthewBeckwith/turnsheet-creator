import React from "react";
import { AppBar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { useLocation } from "react-router-dom";
import HomeNav from "./homeNav";
import TurnsheetNav from "./turnsheetNav";
import EditTurnsheetNav from "./editTurnsheetNav";

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
        {location.pathname === "/create_turnsheet" && <TurnsheetNav />}
        {location.pathname.slice(0, location.pathname.lastIndexOf('/')) === "/edit_turnsheet" && <EditTurnsheetNav />}
      </AppBar>
    </div>
  );
}
