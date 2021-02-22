import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// --- Global Layout
import {
  Container
} from '@material-ui/core';


// --- Pages
import HomePg from './pages/home_pg';
import TurnsheetPg from './pages/turnsheet_pg';

// --- Components
import GlobalNav from './components/Nav/globalNav';


ReactDOM.render((
  <React.StrictMode>
    <Router>
      <GlobalNav />

      <Container>
        <Switch>
          <Route path="/" exact component={HomePg} />
          <Route path="/turnsheet" exact component={TurnsheetPg} />
        </Switch>
      </Container>

    </Router>
  </React.StrictMode>
),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
