import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// --- Firebase
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

// --- Global Layout
import {
  Container
} from '@material-ui/core';


// --- Pages
import HomePg from './pages/home_pg';
import TurnsheetPg from './pages/turnsheet_pg';

// --- Components
import GlobalNav from './components/Nav/globalNav';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DBURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


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
