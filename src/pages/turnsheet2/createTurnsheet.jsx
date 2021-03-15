import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";

import Room from "./components/room";

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
const created_date = new Date().toDateString();

const defaultItems = [
  {
    "item_description": "Standard Cleaning",
    "item_estimated_labor_hours": 12.5,
    "item_estimated_labor_total": 250,
    "item_estimated_material_cost": 0,
    "item_estimated_total_cost": 250,
    "item_notes": "",
    "item_created_at": created_date,
    "item_updated_at": created_date,
    "owner_responsibilty": false
  },
  {
    "item_description": "Air Filter",
    "item_estimated_labor_hours": 0.25,
    "item_estimated_labor_total": 5,
    "item_estimated_material_cost": 10,
    "item_estimated_total_cost": 15,
    "item_notes": "",
    "item_created_at": created_date,
    "item_updated_at": created_date,
    "owner_responsibilty": false
  },
  {
    "item_description": "Pest Control",
    "item_estimated_labor_hours": 5,
    "item_estimated_labor_total": 100,
    "item_estimated_material_cost": 0,
    "item_estimated_total_cost": 100,
    "item_notes": "",
    "item_created_at": created_date,
    "item_updated_at": created_date,
    "owner_responsibilty": false
  },
]

export default function CreateTurnsheet({
  ID,
  unitAddress,
  lastSecurityDeposit,
  ownerBalance,
}) {
  const classes = useStyles();

  const [rooms, setRooms] = useState(["interior"]);
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

  return (
    <Grid container spacing={2} className={classes.root}>
      {rooms.length > 0 &&
        rooms.map((room, index) => {
          return (
            <Grid item key={room} xs={12} md={4}>
              <Room
                roomName={room}
                index={index}
                handleRemoveRoom={removeRoom}
                defaultItems={room === 'interior' ? defaultItems : null}
              />
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
