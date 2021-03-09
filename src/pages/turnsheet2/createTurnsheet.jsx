import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
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
  let rand = 0;

  const addRoom = () => {
    rand = Math.floor(Math.random() * 10000);
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
              <Typography
                className={classes.title}
                color="textSecondary"
                component="span"
                gutterBottom
              >
                {roomName}
              </Typography>
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
          <List>
            {roomItems.map((item, index) => {
              return (
                <ListItem key={`${item.room_name}-${index}`}>
                  <ListItemText>{item.title} - {item.item_total}</ListItemText>
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
            return <p key={`${room}-${rand}`}>{room}</p>;
          })}
      </div>
    );
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      {rooms.length > 0 &&
        rooms.map((room, index) => {
          return (
            <Grid item key={`${room}-${rand}`} xs={12} md={4}>
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
