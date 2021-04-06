import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@material-ui/core";

import useGetItems from "./hooks/useGetItems";
import useGetRooms from "./hooks/useGetRooms";
import useGetTurnData from "./hooks/useGetTurnData";
import useReturnKey from "./hooks/useReturnKey";

import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

const Room = ({ ID, room_name }) => {
  const classes = useStyles();
  const items = useGetItems(ID, room_name);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item>
            <Typography variant="h4">{room_name}</Typography>
          </Grid>
          {items &&
            items.map((item, index) => {
              return (
                <Grid
                  item
                  container
                  justify="space-between"
                  key={`${room_name}-item-${index}`}
                >
                  <Grid item>
                    <Typography>{item.description}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${item.estimated_total_cost}</Typography>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </div>
  );
};

const Turnsheet = () => {
  const classes = useStyles();
  const { ID } = useParams();
  const turnsheetID = useReturnKey(ID);
  const turnData = useGetTurnData(ID);
  const rooms = useGetRooms(turnsheetID);

  const TurnsheetData = () => {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="caption">
                Turnsheet : {turnsheetID}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                Address: {turnData.address}
              </Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Grid item>
                <Typography variant="caption">
                  Last Deposit: {turnData.last_deposit}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  Total: {turnData.estimated_grand_total}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  Requires Investment: {turnData.requires_investment.toString()}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container justify="space-between">
              <Grid item>
                <Typography variant="caption">
                  Owner: {turnData.owner_subtotal}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  Tenant: {turnData.tenant_subtotal}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };

  return (
    <Grid container className={classes.root}>
      {turnsheetID ? (
        <Grid item>
          <TurnsheetData />
          {rooms &&
            rooms.map((room) => (
              <Room key={`room-${room}`} ID={turnsheetID} room_name={room} />
            ))}
        </Grid>
      ) : (
        <p>loading...</p>
      )}
    </Grid>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          <Switch>
            <Route path="/:ID" component={Turnsheet} />
            <Route path="/" component={Turnsheet} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
