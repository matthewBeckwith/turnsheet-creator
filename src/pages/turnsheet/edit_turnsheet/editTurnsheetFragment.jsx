import React from "react";
import firebase from "../../../services/firebase";
import { useListKeys } from "react-firebase-hooks/database";
import { makeStyles } from "@material-ui/core/styles";

import { List } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "70vh",

    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

export default function EditTurnsheetFragment({ id }) {
  const classes = useStyles();
  const [turnData, loading, error] = useListKeys(
    firebase.database().ref(`turnsheets/${id}`)
  );
  return (
    <div>
      <div>Edit Turnsheet Fragment</div>
      <h3>Turnsheet ID: {id}</h3>
      <List className={classes.root} subheader={<li />}>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        {!loading && turnData && (
          <React.Fragment>
            {turnData.map((turnKey, index) => {
              console.log(turnKey);
              return <div key={index}>{turnKey}</div>;
            })}
          </React.Fragment>
        )}
      </List>
    </div>
  );
}
