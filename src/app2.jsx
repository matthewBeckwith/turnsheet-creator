import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import useCreateKey from "./hooks/useCreateKey";
import firebase from "./services/firebase";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  AccordionActions,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import DefaultItems from './utils/default_items.json';
import CommonItems from './utils/common_items.json';

const LaborHourCounter = () => { 
  return (
    <div>
      <p>This will be a labor hours counter</p>
    </div>
  )
}

const Turnsheet = () => {
  const { ID } = useParams();
  const uniqueID = useCreateKey();

  const [turnsheetID, setTurnsheetID] = useState(null);
  const [isExisting, setIsExisting] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    ID ? setTurnsheetID(ID) : setTurnsheetID(uniqueID);
  }, [ID, uniqueID]);

  useEffect(() => {
    if (turnsheetID !== null) {
      firebase
        .database()
        .ref(`turnsheets`)
        .once("value", (snapshot) => {
          setIsExisting(snapshot.hasChild(turnsheetID));
        });
    }
  }, [turnsheetID]);

  useEffect(() => {
    if (isExisting) {
      firebase
        .database()
        .ref(`turnsheets/${turnsheetID}/rooms`)
        .once("value", (roomsSnapshot) => {
          roomsSnapshot.foreach((room) => {
            setRooms([...rooms, room.key]);
          });
        });
      firebase
        .database()
        .ref(`turnsheets/${turnsheetID}/items`)
        .once("value", (itemsSnapshot) => {
          itemsSnapshot.foreach((item) => {
            setRooms([...items, item]);
          });
        });
      setCurrentSelection(rooms[0]);
    } else {
      const todaysDate = new Date().toDateString();
      setRooms(["interior"]);
      setItems({
        interior: DefaultItems
      });
      setCurrentSelection("interior");
    }
  }, [isExisting]);

  useEffect(() => {
    setCurrentItems(items[currentSelection]);
  }, [currentSelection]);

  const RoomsList = () => {
    return (
      <Drawer variant="permanent">
        <Toolbar />
        <List style={{ width: 115 }}>
          <ListItem button onClick={() => console.log("Add Room")}>
            <ListItemText primary="Add Room" />
          </ListItem>
          {rooms &&
            rooms.map((room, index) => {
              return (
                <ListItem
                  button
                  key={`roomLink-${room}`}
                  onClick={() => setCurrentSelection(room)}
                >
                  <ListItemText primary={room} />
                </ListItem>
              );
            })}
        </List>
      </Drawer>
    );
  };

  const RoomContent = () => {
    return (
      <React.Fragment>
        <Toolbar />
        {currentItems &&
          currentItems.map((item) => {
            return (
              <Accordion key={`${item.item_description}`}>
                <AccordionSummary
                  id={currentSelection}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography>{item.item_description}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{item.item_estimated_total_cost}</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.item_estimated_labor_hours}</Typography>
                </AccordionDetails>
                <AccordionActions>
                  <IconButton size="small">
                    <DeleteForeverIcon fontSize="inherit" />
                  </IconButton>
                </AccordionActions>
              </Accordion>
            );
          })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <AppBar style={{ zIndex: 100 }}>
        <Toolbar>
          <Typography variant="h5">Turnsheet Creator</Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="space-evenly" spacing={2}>
        <Grid item style={{ zIndex: 10, width: 115 }}>
          <RoomsList />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <RoomContent />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:ID" component={Turnsheet} />
        <Route path="/" exact component={Turnsheet} />
      </Switch>
    </Router>
  );
}
