import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// --- Global Layout
import { Container } from "@material-ui/core";

// --- Pages
import HomePg from "./home/home_pg";
import TurnsheetPg from "./turnsheet/turnsheet_pg";

// --- Components
import GlobalNav from "../components/nav/globalNav";

export default function App() {
  return (
    <Router>
      <GlobalNav />

      <Container>
        <Switch>
          <Route path="/edit_turnsheet/:id" component={TurnsheetPg} />
          <Route path="/create_turnsheet" exact component={TurnsheetPg} />
          <Route path="/" exact component={HomePg} />
        </Switch>
      </Container>
    </Router>
  );
}
