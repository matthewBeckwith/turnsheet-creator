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
import "firebase/firestore";

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
  apiKey: "AIzaSyB2J7WbVw3IgDSMooPb-SYn-IDOXZhhvmA",
  authDomain: "turnsheet-creator.firebaseapp.com",
  databaseURL: "https://turnsheet-creator-default-rtdb.firebaseio.com",
  projectId: "turnsheet-creator",
  storageBucket: "turnsheet-creator.appspot.com",
  messagingSenderId: "805556815927",
  appId: "1:805556815927:web:740ba9e7c4f21db5d097b2",
  measurementId: "G-GL77XZ73Z3"
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
