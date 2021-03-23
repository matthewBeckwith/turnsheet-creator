import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
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
        <Toolbar>
          <Grid container spacing={16} justify="space-between">
            
              {location.pathname === "/" ? <HomeNav handleSearch={handleSearch} /> : 
                <React.Fragment>
                  <Box order={{xs:1}}>
                    <Grid item xs={1}>
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
                    </Grid>
                  </Box>
                  <Box clone order={{xs: 4, md:2}}>
                    <Grid item xs={12} md={7}>
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
                  </Box>
                  <Box clone order={{xs: 2, md:3}}>
                    <Grid item xs={2}>
                      <Typography variant="h5" color="secondary" align="right">${grandTotal}</Typography>
                    </Grid>
                  </Box>
                  <Box clone order={{xs: 3, md:4}}>
                    <Grid item xs={2}>
                      <Button>Submit</Button>
                    </Grid>
                  </Box>
                </React.Fragment>
              }

          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
