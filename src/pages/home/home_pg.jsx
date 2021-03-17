import React from "react";
import firebase from "../../services/firebase";
import { useListKeys } from "react-firebase-hooks/database";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TurnsheetList from "./components/turnsheet_list";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "70vh",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

export default function HomePg({ searchFor }) {
  const classes = useStyles();
  const [years, loading, error] = useListKeys(
    firebase.database().ref(`grouped_by_year`)
  );

  return (
    <List className={classes.root} subheader={<li />}>
      {error && <strong>Error: {error}</strong>}
      {loading && <pre>Loading...</pre>}
      {!loading && years && (
        <React.Fragment>
          {years.map((year, index) => {
            return (
              <TurnsheetList key={index} year={year} searchFor={searchFor} />
            );
          })}
        </React.Fragment>
      )}
    </List>
  );
}
