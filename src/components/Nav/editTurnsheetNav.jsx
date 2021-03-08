import React from "react";
import { Link } from "react-router-dom";
import { Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

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
    <Toolbar>
      <Link to="/">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="cancel"
        >
          <CloseIcon />
        </IconButton>
      </Link>

      <Typography className={classes.title} variant="h6" noWrap>
        Edit Turnsheet
      </Typography>
    </Toolbar>
  );
}
