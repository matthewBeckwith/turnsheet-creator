import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function EditTurnsheetNav({ handleAddress }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.title} variant="h6" noWrap>
        Edit Turnsheet
      </Typography>
    </React.Fragment>
  );
}
