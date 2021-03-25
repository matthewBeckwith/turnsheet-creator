import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import firebase from "./services/firebase";
import useCreateKey from "./hooks/useCreateKey";

import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
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

const GlobalNav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>Turnsheet Creator</Typography>
      </Toolbar>
    </AppBar>
  );
};

const Turnsheet = () => {
  const { ID } = useParams();
  const uniqueID = useCreateKey();

  const [turnsheetID, setTurnsheetID] = useState(null); // pulled from params or created
  const [unitAddress, setUnitAddress] = useState(null); // String input by user
  const [unitSecurityDeposit, setUnitSecurityDeposit] = useState(null); // Number input by user
  const [ownerBalance, setOwnerBalance] = useState(null); // Number input by user
  const [grandTotal, setGrandTotal] = useState(null);
  const [rooms, setRooms] = useState([]); // Array of Objects, ID of each is to be created by firebase
  const [turnsheet, setTurnsheet] = useState(null);
  const [todaysDate] = useState(new Date().toDateString());

  useEffect(() => {
    // Assign or Create TurnsheetID for Firebase
    console.log("hello from assign or create ID");
    ID ? setTurnsheetID(ID) : setTurnsheetID(uniqueID);
  }, [uniqueID]);

  useEffect(() => {
    // Is this an Existing Turnsheet?
    console.log("hello from does this turn exist");
    if (turnsheetID !== null) {
      firebase
        .database()
        .ref(`turnsheets`)
        .on("value", (snapshot) => {
          snapshot.hasChild(turnsheetID)
            ? setTurnsheet(snapshot.val())
            : setTurnsheet({
                unit_address: "",
                last_security_deposit: 0,
                owner_balance: 0,
                grand_total: 365,
                rooms: [
                  {
                    room_name: "interior",
                    room_total: 365,
                    items: [
                      {
                        item_description: "Standard Cleaning",
                        item_estimated_labor_hours: 12.5,
                        item_estimated_labor_total: 250,
                        item_estimated_material_cost: 0,
                        item_estimated_total_cost: 250,
                        item_notes: "",
                        item_created_at: todaysDate,
                        item_updated_at: todaysDate,
                        owner_responsibilty: false,
                      },
                      {
                        item_description: "Air Filter",
                        item_estimated_labor_hours: 0.25,
                        item_estimated_labor_total: 5,
                        item_estimated_material_cost: 10,
                        item_estimated_total_cost: 15,
                        item_notes: "",
                        item_created_at: todaysDate,
                        item_updated_at: todaysDate,
                        owner_responsibilty: false,
                      },
                      {
                        item_description: "Pest Control",
                        item_estimated_labor_hours: 5,
                        item_estimated_labor_total: 100,
                        item_estimated_material_cost: 0,
                        item_estimated_total_cost: 100,
                        item_notes: "",
                        item_created_at: todaysDate,
                        item_updated_at: todaysDate,
                        owner_responsibilty: false,
                      },
                    ],
                  },
                ],
              });
        });
    }
  }, [turnsheetID]);

  useEffect(() => {
    // Convert Turnsheet into seperate state variables
    console.log("hello from create state");
    if (turnsheet !== null) {
      setUnitAddress(turnsheet.unit_address);
      setUnitSecurityDeposit(turnsheet.last_security_deposit);
      setOwnerBalance(turnsheet.owner_balance);
      setGrandTotal(turnsheet.grand_total);
      setRooms(turnsheet.rooms);
    }
  }, [turnsheet]);

  useEffect(() => {
    console.log("hello from rooms effect");
  }, [rooms.length]);

  // Add and remove rooms from State Variable
  const handleAddRoom = (roomObj) => {
    console.log("hello from add room", roomObj);
    setRooms([...rooms, roomObj]);
  };

  const handleDelRoom = (index) => {
    console.log("hello from del room", rooms[index]);
    const newRooms = [...rooms];
    newRooms.splice(index, 1);
    setRooms(newRooms);
  };

  const handleGrandTotal = (itemList) => {
    console.log("hello from grand total", itemList);
    let newTotal = 0;
    itemList.map((item) => {
      newTotal += item.item_estimated_total_cost;
    });
    setGrandTotal(newTotal);
  };

  return (
    <div>
      {turnsheet && (
        <div>
          <Grid container justify="space-between">
            <Grid item xs={8} container>
              <Grid item xs={9}>
                <Typography variant="caption">
                  Address: {unitAddress}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption">Total: {grandTotal}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">
                  Security Deposit: {unitSecurityDeposit}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">
                  Owner Balance: {ownerBalance}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={() =>
                  handleAddRoom({
                    room_name: "test room",
                    room_total: 0,
                    items: [],
                  })
                }
              >
                Add Room
              </Button>
            </Grid>
          </Grid>
          {rooms.length > 0 ? (
            <Grid container>
              {rooms.map((room, index) => (
                <Room
                  key={`room-${index}`}
                  handleGrandTotal={handleGrandTotal}
                  handleDelRoom={handleDelRoom}
                  roomIndex={index}
                  roomObj={room}
                />
              ))}
            </Grid>
          ) : (
            <Typography>No Rooms</Typography>
          )}
        </div>
      )}
    </div>
  );
};

const Room = ({ handleGrandTotal, handleDelRoom, roomIndex, roomObj }) => {
  const [roomName, setRoomName] = useState(null);
  const [items, setItems] = useState([]);
  const [roomTotalCost, setRoomTotalCost] = useState(0);

  useEffect(() => {
    setRoomName(roomObj.room_name);
    setItems(roomObj.items);
  }, []);

  useEffect(() => {
    let newTotal = 0;
    items.map((item) => {
      newTotal += item.item_estimated_total_cost;
    });

    setRoomTotalCost(newTotal);
  }, [items.length]);

  const handleAddItem = (itemObj) => {
    console.log("hello from add item");
    setItems([...items, itemObj]);
  };

  const handleDelItem = (index) => {
    console.log("hello from del item");
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Grid container justify="space-between">
        <Grid item xs={4}>
          <Typography>{roomName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">${roomTotalCost}</Typography>
        </Grid>
        <Grid item>
          <Button
            size="small"
            onClick={() =>
              handleAddItem({
                item_description: "Test Item",
                item_estimated_labor_hours: 0.25,
                item_estimated_labor_total: 5,
                item_estimated_material_cost: 10,
                item_estimated_total_cost: 15,
                item_notes: "",
                item_created_at: new Date().toDateString(),
                item_updated_at: new Date().toDateString(),
                owner_responsibilty: false,
              })
            }
          >
            Add Item
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" onClick={() => handleDelRoom(roomIndex)}>
            Remove Room
          </Button>
        </Grid>
      </Grid>
      {items.length > 0 ? (
        <div>
          {items.map((item, index) => (
            <Item
              key={`${roomObj.room_name}-item-${index}`}
              handleDelItem={handleDelItem}
              itemObj={item}
              index={index}
            />
          ))}
        </div>
      ) : (
        <Typography variant="caption">No Items</Typography>
      )}
    </Grid>
  );
};

const Item = ({ handleDelItem, itemObj, index }) => {
  return (
    <Grid container justify="space-between">
      <Grid item>
        <Typography variant="caption">
          {itemObj.item_description} - ${itemObj.item_estimated_total_cost}
        </Typography>
      </Grid>
      <Grid item>
        <Button size="small" onClick={() => handleDelItem(index)}>
          Remove Item
        </Button>
      </Grid>
    </Grid>
  );
};

const Dashboard = () => {
  const [searchFor, setSearchFor] = useState(null); // search by address

  return <div>Dashboard</div>;
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <GlobalNav />
        <Container>
          <Switch>
            <Route path="/turnsheet/:ID" render={() => <Turnsheet />} />
            <Route path="/turnsheet" render={() => <Turnsheet />} />
            <Route path="/" exact render={() => <Dashboard />} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
