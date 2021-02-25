import React from "react";

import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import EditTurnsheetFragment from "./fragments/editTurnsheetFragment";
import CreateTurnsheetFragment from "./fragments/createTurnsheetFragment";
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
  const { id } = useParams();

  return (
    <div className={classes.root}>
      {id ? (
        <EditTurnsheetFragment id={id} />
      ) : (
        <CreateTurnsheetFragment id={id} />
      )}

      <AddItemModal />
    </div>
  );
}
