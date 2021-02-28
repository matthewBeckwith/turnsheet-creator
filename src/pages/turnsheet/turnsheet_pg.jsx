import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import EditTurnsheetFragment from "./edit_turnsheet/editTurnsheetFragment";
import CreateTurnsheetFragment from "./create_turnsheet/createTurnsheetFragment";
import AddRoomModal from "./components/addRoomModal";

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
      {id ? <EditTurnsheetFragment id={id} /> : <CreateTurnsheetFragment />}

      <AddRoomModal />
    </div>
  );
}
