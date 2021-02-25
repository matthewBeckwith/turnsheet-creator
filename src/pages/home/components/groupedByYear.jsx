import React from "react";
import firebase from "../../../services/firebase";
import { useListKeys } from "react-firebase-hooks/database";

import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import TurnsheetList from "./turnsheet_list";

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

export default function GroupedByYear() {
  const classes = useStyles();
  const [years, loading, error] = useListKeys(
    firebase.database().ref(`grouped_by_year`)
  );

  return (
    <List className={classes.root} subheader={<li />}>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Loading...</span>}
      {!loading && years && (
        <React.Fragment>
          {years.map((year, index) => {
            return <TurnsheetList key={index} year={year} />;
          })}
        </React.Fragment>
      )}
    </List>
  );
}
