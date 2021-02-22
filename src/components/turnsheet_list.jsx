import React, { useEffect, useState } from "react";
import TurnsheetListItem from "./turnsheet_list_item";

import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader } from "@material-ui/core";

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
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    const turnList = [];

    for (let id in year) {
      if (year[id].hasOwnProperty("address")) {
        turnList.push({ id, ...year[id] });
      }
    }

    setTurns(turnList);
  }, []);

  return (
    <li key={`section-${year.id}`} className={classes.listSection}>
      <ul className={classes.ul}>
        <ListSubheader>{year.id}</ListSubheader>
        {turns.map((turn, index) => {
          return <TurnsheetListItem key={index} index={index} turn={turn} />;
        })}
      </ul>
    </li>
  );
}
