import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useParams } from "react-router-dom";

import { Container } from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import firebase from "../services/firebase";
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

export default function App() {
  // const { ID } = useParams();

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

  // const [turnsheetID, setTurnsheetID] = useState(null);
  // useEffect(() => {
  //   if (ID) {
  //     setTurnsheetID(ID);
  //   } else {
  //     firebase
  //       .database()
  //       .ref("turnsheets")
  //       .push()
  //       .then((ref) => {
  //         setTurnsheetID(ref.key);
  //       });
  //   }
  // }, []);

  const [rooms, setRooms] = useState([]);
  const handleSetDefaultRoom = () => {
    setRooms(['interior']);
  };
  const handleAddRoom = () => {
    const rand = Math.floor(Math.random() * 10000);
    const tempRoomName = `room ${rand}`;
    setRooms([...rooms, tempRoomName]);
  };
  const handleRemoveRoom = (index) => {
    const newList = [...rooms];
    newList.splice(index, 1);
    setRooms(newList);
  };

  const [items, setItems] = useState([]);

  const [grandTotal, setGrandTotal] = useState(0);
  const handleGrandTotal = () => {
    setGrandTotal()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <GlobalNav
          handleSearch={handleSearch}
          handleAddress={handleAddress}
          handleSecDeposit={handleSecDeposit}
          handleOwnerBalance={handleOwnerBalance}
          grandTotal={grandTotal}
        />

        <Container>
          <Switch>
            <Route
              path="/edit_turnsheet/:ID"
              render={() => (
                <TurnsheetPg />
              )}
            />
            <Route
              path="/create_turnsheet"
              exact
              render={() => (
                <TurnsheetPg
                  rooms={rooms}
                  handleSetDefaultRoom={handleSetDefaultRoom}
                  handleAddRoom={handleAddRoom}
                  handleRemoveRoom={handleRemoveRoom}
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
