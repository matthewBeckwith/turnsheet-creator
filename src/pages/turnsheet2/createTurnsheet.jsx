import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CreateTurnsheet({
  ID,
  unitAddress,
  lastSecurityDeposit,
  ownerBalance,
}) {
  const classes = useStyles();
  const [rooms, setRooms] = useState(["interior"]);
  const addRoom = () => {
    const tempRoomName = `room ${rooms.length}`;
    setRooms([...rooms, tempRoomName]);
  };
  const removeRoom = (index) => {
    const newList = rooms;
    newList.splice(index, 1);
    setRooms(newList);
  };

  const [items, setItems] = useState([
    {
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
  ]);

  const RoomCard = ({ roomName }) => {
    return (
      <Card className={classes.root}>
        <CardContent>
          <IconButton
            size="small"
            component="span"
            onClick={() => removeRoom(this)}
          >
            <DeleteForeverIcon
              fontSize="inherit"
              style={{ color: "#990a00" }}
            />
          </IconButton>
          <Typography
            className={classes.title}
            color="textSecondary"
            component="span"
            gutterBottom
          >
            {roomName}
          </Typography>
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
            return <p key={`${room}-room`}>{room}</p>;
          })}
      </div>
    );
  };

  return (
    <Grid container spacing={2}>
      {rooms &&
        rooms.map((room, index) => {
          return (
            <Grid item key={`room-${room}`}>
              <RoomCard roomName={room} index={index} />
            </Grid>
          );
        })}
      <Grid item>
        <Button variant="contained" color="secondary" onClick={addRoom}>
          ADD ROOM
        </Button>
      </Grid>
    </Grid>
  );
}
