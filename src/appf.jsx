import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Hidden,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import useCreateKey from "./hooks/useCreateKey";
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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

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
  const ID = useCreateKey();
  const [ownerTotal, setOwnerTotal] = useState(0);
  const [tenantTotal, setTenantTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [ownerBalance, setOwnerBalance] = useState("");

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeSecurityDeposit = (e) => {
    setSecurityDeposit(e.target.value);
  };

  const handleChangeOwnerBalance = (e) => {
    setOwnerBalance(e.target.value);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar style={{ paddingBottom: 15 }}>
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={12} sm={6} md={8} lg={9} style={{ paddingTop: 10 }}>
              <Hidden smUp>
                <Typography variant="h6" align="center" style={{ flexGrow: 1 }}>
                  Create Turnsheet
                </Typography>
              </Hidden>
              <Hidden only="xs">
                <Typography variant="h6" align="left" style={{ flexGrow: 1 }}>
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
                  value={address}
                  onChange={(event) => handleChangeAddress(event)}
                />
              </Grid>
              <Grid item xs={6} sm={3} lg={2}>
                <TextField
                  id="security_deposit_textfield"
                  label="Security Deposit"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={securityDeposit}
                  onChange={(event) => handleChangeSecurityDeposit(event)}
                />
              </Grid>
              <Grid item xs={6} sm={3} lg={2}>
                <TextField
                  id="owner_balance_textfield"
                  label="Owner Balance"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={ownerBalance}
                  onChange={(event) => handleChangeOwnerBalance(event)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Hidden smUp>
        <Toolbar style={{ height: 250 }} />
      </Hidden>
      <Hidden only="xs">
        <Toolbar style={{ height: 130 }} />
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
