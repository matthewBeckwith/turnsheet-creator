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
  ListItemText,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import Room from "./components/room";
import TestFirebase from './testFirebase';
import StaticTextDataService from '../../utils/testCrud';

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
    height: 150,
    maxHeight: 150,
    overflowY: "scroll",
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

  const labor_cost = 20;

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
        item_description: "Standard Cleaning",
        item_estimated_labor_hours: 12.5,
        item_estimated_labor_total: 250,
        item_estimated_material_cost: 0,
        item_estimated_total_cost: 0,
        item_notes: "",
        item_created_at: new Date().toDateString(),
        item_updated_at: new Date().toDateString(),
        owner_responsibilty: false
      },
      {
        item_description: "Replace Air Filter",
        item_estimated_labor_hours: 0.25,
        item_estimated_labor_total: 5,
        item_estimated_material_cost: 10,
        item_estimated_total_cost: 15,
        item_notes: "",
        item_created_at: new Date().toDateString(),
        item_updated_at: new Date().toDateString(),
        owner_responsibilty: false
      },
      {
        item_description: "Pest Spray",
        item_estimated_labor_hours: 5,
        item_estimated_labor_total: 100,
        item_estimated_material_cost: 0,
        item_estimated_total_cost: 100,
        item_notes: "",
        item_created_at: new Date().toDateString(),
        item_updated_at: new Date().toDateString(),
        owner_responsibilty: false
      },
    ]);
    
    const testData = StaticTextDataService.getAll().on("value", snapshot => {
      console.log("test data: ", snapshot.val());
    });

    

  }, []);

  const RoomCard = ({ roomName, index }) => {
    const roomItems = items.filter((item) => {
      return item.room_name === roomName;
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
                    </Grid>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
        <CardActions>
          <Button size="small">Add Item</Button>
        </CardActions>
      </Card>
    );
  };

  return (
    // <Grid container spacing={2} className={classes.root}>
    //   {rooms.length > 0 &&
    //     rooms.map((room, index) => {
    //       return (
    //         <Grid item key={room} xs={12} md={4}>
    //           {/* <RoomCard roomName={room} index={index} /> */}
    //           <Room
    //             roomName={room}
    //             index={index}
    //             handleRemoveRoom={removeRoom}
    //           />
    //         </Grid>
    //       );
    //     })}
    //   <Grid item xs={12} md={4}>
    //     <Button
    //       variant="contained"
    //       color="secondary"
    //       fullWidth
    //       onClick={addRoom}
    //     >
    //       ADD ROOM
    //     </Button>
    //   </Grid>
    // </Grid>
    // <TestFirebase />
    <div>Hello</div>
  )
}