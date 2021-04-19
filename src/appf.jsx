import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useArray } from "react-hanger";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  AppBar,
  Container,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import useCreateKey from "./hooks/useCreateKey";
import DefaultItems from "./utils/default_items.json";
import ErrorPage from "./pages/error_pg";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4a7b9d",
    },
    secondary: {
      main: "#d9dbf1",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "::-webkit-scrollbar": {
          backgroundColor: "rgba(217,219,241,0.5)",
          width: 4,
          borderRadius: 20,
          "&:hover": {
            backgroundColor: "rgba(217,219,241,0.7)",
          },
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#d9dbf1",
          borderRadius: 20,
          "&:hover": {
            backgroundColor: "#4a7b9d",
          },
        },
      },
    },
  },
  props: {},
});

const useStyles = makeStyles((theme) => ({
  navRoot: {
    padding: `10px 0 15px 0`,
  },
  roomRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      "& + :not(firstOfType)": {
        marginTop: 20,
      },
    },
  },
  roomItemRoot: {
    flexGrow: 1,
    padding: theme.spacing(2),
    "& + :not(firstOfType)": {
      marginTop: 5,
    },
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItemRoot:{
    width:'100%',
    left: -20,
  },
  delete_btn: {
    color: "rgba(158, 2, 2, 0.3)",
    "& :hover": {
      color: "rgba(158, 2, 2, 1)",
    },
  },
}));

const VerticalSpace = ({ size }) => {
  return <Toolbar style={{ height: size }} />;
};

const ViewTurnsheet = () => {
  const { ID } = useParams();
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h4" align="center">
            View Turnsheet
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Typography variant="h5">{ID}</Typography>
    </>
  );
};

const EditTurnsheet = () => {
  const { ID } = useParams();
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h4">Edit Turnsheet</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Typography variant="h5">{ID}</Typography>
    </>
  );
};

const CreateTurnsheet = () => {
  const classes = useStyles();
  const ID = useCreateKey();
  const moneyExp = /^[0-9]+\.[0-9]{2}$/;
  const [ownerTotal, setOwnerTotal] = useState(0);
  const [tenantTotal, setTenantTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [ownerBalance, setOwnerBalance] = useState("");
  const rooms = useArray(["interior"]);
  const items = useArray(DefaultItems);

  return (
    <>
      <AppBar position="fixed" className={classes.navRoot}>
        <Toolbar>
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <Hidden smUp>
                <Typography variant="h6" align="center">
                  Create Turnsheet
                </Typography>
              </Hidden>
              <Hidden only="xs">
                <Typography variant="h6" align="left">
                  Create Turnsheet
                </Typography>
              </Hidden>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              container
              spacing={1}
              justify="space-evenly"
            >
              <Grid item xs={4} container align="center">
                <Grid item xs={12}>
                  <Typography variant="caption">Owner Total</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">${ownerTotal}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={4} container align="center">
                <Grid item xs={12}>
                  <Typography variant="caption">Tenant Total</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">${tenantTotal}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={4} container align="center">
                <Grid item xs={12}>
                  <Typography variant="caption">Grand Total</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">${grandTotal}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1} justify="space-between">
              <Grid item xs={12} sm={6} lg={8}>
                <TextField
                  id="address_textfield"
                  label="Address"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete="off"
                  value={address}
                />
              </Grid>
              <Grid item xs={6} sm={3} lg={2}>
                <TextField
                  id="security_deposit_textfield"
                  label="Security Deposit"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete="off"
                  inputProps={{ pattern: moneyExp }}
                  value={securityDeposit}
                />
              </Grid>
              <Grid item xs={6} sm={3} lg={2}>
                <TextField
                  id="owner_balance_textfield"
                  label="Owner Balance"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete="off"
                  inputProps={{ pattern: moneyExp }}
                  value={ownerBalance}
                />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Hidden smUp>
        <VerticalSpace size={250} />
      </Hidden>
      <Hidden only="xs">
        <VerticalSpace size={150} />
      </Hidden>

      <Hidden xsDown>
        <Grid container justify="space-between" spacing={1}>
          {rooms.value.map((room) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={`${room}`}
                className={classes.roomRoot}
              >
                <Paper style={{ padding: 10 }}>
                  <Grid container justify="space-between" spacing={1}>
                    <Grid item xs={11}>
                      <Typography variant="h5">{room}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        className={classes.delete_btn}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Grid>
                  </Grid>

                  {items.value.length > 0 &&
                    items.value
                      .filter((item) => item.room === room)
                      .map((item, index) => {
                        return (
                          <Paper
                            key={`item-${index}`}
                            className={classes.roomItemRoot}
                            onClick={() =>
                              console.log(`Hello from item ${index}`)
                            }
                          >
                            <Grid container justify="space-between" spacing={1}>
                              <Grid item xs={10}>
                                <Typography align="left" variant="body1">
                                  {item.description}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Typography align="right" variant="body1">
                                  {item.estimated_total_cost}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        );
                      })}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Hidden>

      <Hidden smUp>

        <List className={classes.listRoot} dense subheader={<li />}>
          {rooms.value.map((room) => {
            return (
              <li key={`${room}`}>
                <ul>
                  <ListSubheader className={classes.listItemRoot}>{room}</ListSubheader>
                  {items.value.length > 0 &&
                    items.value
                      .filter((item) => item.room === room)
                      .map((item, index) => {
                        return (

                          <ListItem key={`${room}-item-${index}`} className={classes.listItemRoot} role={undefined} alignItems="flex-start" dense button ContainerComponent="div" onClick={() => console.log(`Hello from item ${index}`)}>
                            <ListItemText id={item.description} className={classes.listItemText} primary={
                              <Grid container justify="space-between" spacing={1}>
                                <Grid item xs={10}>
                                {item.description}
                                </Grid>
                                <Grid item xs={2}>
                                {item.estimated_total_cost}
                                </Grid>
                              </Grid>
                            } />
                          </ListItem>


                        );
                      })}
                </ul>
              </li>
            );
          })}
        </List>

      </Hidden>
    </>
  );
};

const AllTurnsheets = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h4">All Turnsheets</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          <Switch>
            <Route path="/view/:ID" component={ViewTurnsheet} />
            <Route path="/edit/:ID" component={EditTurnsheet} />
            <Route path="/create" component={CreateTurnsheet} />
            <Route path="/" exact component={AllTurnsheets} />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
