import React from "react";
import { AppBar, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import HomeNav from "./homeNav";
import CreateTurnsheetNav from "./createTurnsheetNav";
import EditTurnsheetNav from "./editTurnsheetNav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
        {location.pathname === "/" && <HomeNav handleSearch={handleSearch} />}
        
        
          <Grid container justify="space-between">
            <Grid item xs={10}>
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
            </Grid>
            <Grid item xs={2}>
              <Typography component="span">${grandTotal}</Typography>
            </Grid>
          </Grid>
        
      </AppBar>
    </div>
  );
}
