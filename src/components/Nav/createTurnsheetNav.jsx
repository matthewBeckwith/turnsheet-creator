import React from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Grid,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";

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
  txtInput: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  txtInputIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function CreateTurnsheetNav() {
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
        Create Turnsheet
      </Typography>

      <form noValidate autoComplete="off">
        <Grid container>
          <Grid item>
            <div className={classes.txtInput}>
              <div className={classes.txtInputIcon}>
                <HomeIcon />
              </div>
              <InputBase
                placeholder="Address"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "address" }}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.txtInput}>
              <div className={classes.txtInputIcon}>
                <HomeIcon />
              </div>
              <InputBase
                placeholder="Deposit"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "deposit" }}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.txtInput}>
              <div className={classes.txtInputIcon}>
                <HomeIcon />
              </div>
              <InputBase
                placeholder="Owner Balance"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "owner balance" }}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      </form>
    </Toolbar>
  );
}
