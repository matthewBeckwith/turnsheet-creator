import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import HomePg from "./home/home_pg";
import TurnsheetPg from "./turnsheet2/turnsheet_pg";
import GlobalNav from "../components/nav/globalNav";

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
  overrides: {},
  props: {},
});

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const [address, setAddress] = useState("");
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const [securityDeposit, setSecurityDeposit] = useState(0);
  const handleSecDeposit = (e) => {
    setSecurityDeposit(e.target.value);
  };

  const [ownerBalance, setOwnerBalance] = useState(0);
  const handleOwnerBalance = (e) => {
    setOwnerBalance(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalNav
          handleSearch={handleSearch}
          handleAddress={handleAddress}
          handleSecDeposit={handleSecDeposit}
          handleOwnerBalance={handleOwnerBalance}
        />

        <Container>
          <Switch>
            <Route
              path="/edit_turnsheet/:ID"
              render={() => (
                <TurnsheetPg
                  unitAddress={address}
                  ownerBalance={ownerBalance}
                  lastSecurityDeposit={securityDeposit}
                />
              )}
            />
            <Route
              path="/create_turnsheet"
              exact
              render={() => (
                <TurnsheetPg
                  unitAddress={address}
                  ownerBalance={ownerBalance}
                  lastSecurityDeposit={securityDeposit}
                />
              )}
            />
            <Route
              path="/"
              exact
              render={() => <HomePg searchFor={searchTerm} />}
            />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
