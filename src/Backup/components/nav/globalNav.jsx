import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, InputBase, IconButton, TextField, Toolbar, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { fade, makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import HomeNav from "./homeNav";
import CreateTurnsheetNav from "./createTurnsheetNav";
import EditTurnsheetNav from "./editTurnsheetNav";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
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

export default function GlobalNav({
  handleSearch,
  handleAddress,
  handleSecDeposit,
  handleOwnerBalance,
  grandTotal
}) {
  const classes = useStyles();
  let location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {location.pathname === "/" ? <HomeNav handleSearch={handleSearch} /> : 
            <React.Fragment>
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

              {location.pathname === "/create_turnsheet" && (
                <CreateTurnsheetNav
                  handleAddress={handleAddress}
                  handleSecDeposit={handleSecDeposit}
                  handleOwnerBalance={handleOwnerBalance}
                />
              )}
              {location.pathname.slice(0, location.pathname.lastIndexOf("/")) === "/edit_turnsheet" && (
                <EditTurnsheetNav
                  handleAddress={handleAddress}
                  handleSecDeposit={handleSecDeposit}
                  handleOwnerBalance={handleOwnerBalance}
                />
              )}
              <div className={classes.txtInput}>
                <div className={classes.txtInputIcon}>
                  <AttachMoneyIcon />
                </div>
                <InputBase
                  placeholder="Grand Total"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "grand total" }}
                  value={grandTotal}
                  disabled
                />
              </div>

              <Button>Submit</Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
