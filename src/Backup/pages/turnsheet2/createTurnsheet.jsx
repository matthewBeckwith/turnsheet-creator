import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";

import Room from "./components/room";
import defaultItems from  '../../utils/defaultItems';

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

// const defaultItems = defautItems;

export default function CreateTurnsheet({
  rooms,
  handleSetDefaultRoom,
  handleRemoveRoom,
  handleAddRoom
}) {
  const classes = useStyles();

  useEffect(() => {
    handleSetDefaultRoom()
  }, [])

  return (
    <Grid container spacing={2} className={classes.root}>
      {rooms && rooms.length > 0 &&
        rooms.map((room, index) => {
          return (
            <Grid item key={room} xs={12} md={4}>
              <Room
                roomName={room}
                index={index}
                handleRemoveRoom={handleRemoveRoom}
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
          onClick={handleAddRoom}
        >
          ADD ROOM
        </Button>
      </Grid>
    </Grid>
  );
}
