import React, { useState, useEffect } from "react";
import firebase from "../services/firebase";

import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import TurnsheetList from "./turnsheet_list";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "80px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "80vh",
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
  const [years, setYears] = useState([]);

  useEffect(() => {
    const db = firebase.database().ref("grouped_by_year");
    db.on("value", (snapshot) => {
      const yearsSnap = snapshot.val();
      const yearsList = [];

      for (let id in yearsSnap) {
        yearsList.push({ id, ...yearsSnap[id] });
      }
      setYears(yearsList);
    });
  }, []);

  return (
    <List className={classes.root} subheader={<li />}>
      {years.length > 0 ? (
        years.map((year, index) => {
          return <TurnsheetList key={index} year={year} />;
        })
      ) : (
        <p>Loading...</p>
      )}
    </List>
  );
}
