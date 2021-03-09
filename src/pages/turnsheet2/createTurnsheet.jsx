//TODO: We will need to start separating this file, Room should be it's own component for example which will make the data easier to use.

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  pos: {
    marginBottom: 12,
  },
  itemList_root: {
      height:150,
      maxHeight:150,
      overflowY:'scroll',
      "&::-webkit-scrollbar": {
            display: "none",
        },
    "&::-webkit-scrollbar-thumb": {
        display:'none'
    },
  },
  
});

export default function CreateTurnsheet({
  ID,
  unitAddress,
  lastSecurityDeposit,
  ownerBalance,
}) {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const [items, setItems] = useState([]);

  const addRoom = () => {
    const rand = Math.floor(Math.random() * 10000);
    const tempRoomName = `room ${rand}`;
    setRooms([...rooms, tempRoomName]);
  };

  const removeRoom = (index) => {
    const newList = [...rooms];
    newList.splice(index, 1);
    setRooms(newList);
  };

  useEffect(() => {
    setRooms(["interior"]);
    setItems([
      {
//TODO: labor_cost should be a global variable, we only need to know the predicted hours, the cost per hour is always the same.
        title: "Standard Cleaning",
        room_name: "interior",
        labor_hours: 12.5,
        labor_cost: 20,
        material_cost: 0,
        owner_responsibility: false,
        item_total: 250,
        notes: "",
      },
      {
        title: "Replace Air Filter",
        room_name: "interior",
        labor_hours: 0.5,
        labor_cost: 20,
        material_cost: 10,
        owner_responsibility: false,
        item_total: 15,
        notes: "",
      },
      {
        title: "Pest Spray",
        room_name: "interior",
        labor_hours: 5,
        labor_cost: 20,
        material_cost: 0,
        owner_responsibility: false,
        item_total: 100,
        notes: "",
      },
    ]);
  }, []);

  const RoomCard = ({ roomName, index }) => {
    const roomItems = items.filter(item => {
        return item.room_name === roomName
    });
    return (
      <Card>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <TextField value={roomName} />
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                component="span"
                onClick={() => removeRoom(index)}
              >
                <DeleteForeverIcon
                  fontSize="inherit"
                  style={{ color: "#990a00" }}
                />
              </IconButton>
            </Grid>
          </Grid>
          <List className={classes.itemList_root}>
            {roomItems.map((item, index) => {
              return (
                <ListItem key={`${item.room_name}-${index}`}>
                  <ListItemText>
                      <Grid container justify="space-between">
                          <Grid item>{item.title}</Grid>
                          <Grid item>${item.item_total}</Grid>
                    </Grid></ListItemText>
                </ListItem>
              )
            })}
          </List>
        </CardContent>
        <CardActions>
            <Button size="small">Add Item</Button>
        </CardActions>
      </Card>
    );
  };

  const dataLog = () => {
    return (
      <div>
        <h3>{`Created Turnsheet ID: ${ID}`}</h3>
        {unitAddress ? <p>{unitAddress}</p> : <p>No Address</p>}
        {lastSecurityDeposit ? <p>{lastSecurityDeposit}</p> : <p>No Deposit</p>}
        {ownerBalance ? <p>{ownerBalance}</p> : <p>No Balance</p>}
        {rooms &&
          rooms.map((room) => {
            return <p key={room}>{room}</p>;
          })}
      </div>
    );
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      {rooms.length > 0 &&
        rooms.map((room, index) => {
          return (
            <Grid item key={room} xs={12} md={4}>
              <RoomCard roomName={room} index={index} />
            </Grid>
          );
        })}
      <Grid item xs={12} md={4}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={addRoom}
        >
          ADD ROOM
        </Button>
      </Grid>
    </Grid>
  );
}
