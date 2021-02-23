import React from "react";
import firebase from "../services/firebase";
import { useList } from "react-firebase-hooks/database";

import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader } from "@material-ui/core";

import TurnsheetListItem from "./turnsheet_list_item";

const useStyles = makeStyles((theme) => ({
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

export default function TurnsheetList({ year }) {
  const classes = useStyles();
  const [turns, loading, error] = useList(
    firebase.database().ref(`grouped_by_year/${year}`)
  );

  return (
    <li key={`section-${year}`} className={classes.listSection}>
      <ul className={classes.ul}>
        <ListSubheader>{year}</ListSubheader>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        {!loading && turns && (
          <React.Fragment>
            {turns.map((turn, index) => {
              return (
                <TurnsheetListItem
                  key={index}
                  index={index}
                  year={year}
                  turn={turn.val()}
                />
              );
            })}
          </React.Fragment>
        )}
      </ul>
    </li>
  );
}
