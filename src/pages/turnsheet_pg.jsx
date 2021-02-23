import React from "react";

import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import EditTurnsheetFragment from './fragments/editTurnsheetFragment';
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
  const {id} = useParams();

  return (
    <div className={classes.root}>
      {
        id ? <EditTurnsheetFragment id={id} />
        : <h3>Turnsheet Page!</h3>
      }

      <AddItemModal />
    </div>
  );
}
