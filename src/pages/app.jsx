import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import HomePg from "./home/home_pg";
import TurnsheetPg from "./turnsheet/turnsheet_pg";
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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalNav handleSearch={handleSearch} />

        <Container>
          <Switch>
            <Route path="/edit_turnsheet/:id" component={TurnsheetPg} />
            <Route path="/create_turnsheet" exact component={TurnsheetPg} />
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
