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

export default function CreateTurnsheet({
  ID,
  unitAddress,
  lastSecurityDeposit,
  ownerBalance,
}) {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);

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
  }, []);

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
