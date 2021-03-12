import React from "react";
import firebase from "../../../services/firebase";
import { useList } from "react-firebase-hooks/database";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader } from "@material-ui/core";
import TurnsheetListItem from "./turnsheet_list_item";

const db = firebase.database();

const useStyles = makeStyles((theme) => ({
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

export default function TurnsheetList({ year, searchFor }) {
  const classes = useStyles();
  const [turns, loading, error] = useList(
    db.ref(`grouped_by_year/${year}`)
  );

  return (
    <li key={`section-${year}`} className={classes.listSection}>
      <ul className={classes.ul}>
        <ListSubheader>{year}</ListSubheader>
        {error && <strong>Error: {error}</strong>}
        {loading && <pre>Loading...</pre>}
        {!loading && turns && (
          <React.Fragment>
            {turns
              .map((turn, index) => {
                return (
                  <TurnsheetListItem
                    key={index}
                    index={index}
                    year={year}
                    turnID={turn.key}
                    turn={turn.val()}
                  />
                );
              })
              .filter((filteredTurn) => {
                return (
                  filteredTurn.props.turn.address
                    .toLowerCase()
                    .indexOf(searchFor) > -1
                );
              })}
          </React.Fragment>
        )}
      </ul>
    </li>
  );
}
