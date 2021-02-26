import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import HomePg from "./home/home_pg";
import TurnsheetPg from "./turnsheet/turnsheet_pg";
import GlobalNav from "../components/nav/globalNav";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
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
  );
}
