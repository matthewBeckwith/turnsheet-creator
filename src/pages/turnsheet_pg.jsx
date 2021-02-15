import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AddItemModal from "../components/AddItemModal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function TurnsheetPg() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>Turnsheet Page!</div>

      <AddItemModal />
    </div>
  );
}
