import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import AddItemModal from "./addItemModal";

const useStyles = makeStyles({
  roomCardRoot: {
    marginTop: 10,
  },
  roomCardBody: {
    marginTop: 15,
    height: 200,
    maxHeight: 200,
    overflowY: "scroll",
    overflowX: "hidden",
  },
  deleteBtn: {
    color: "#990a00",
    opacity: 0.2,
    "&:hover": {
      opacity: 0.6,
    },
  },
});

export default function Room({
  roomName,
  index,
  handleRemoveRoom,
  defaultItems,
}) {
  const classes = useStyles();
  const [room_name, setRoom_name] = useState(roomName);
  const handleRoomNameChange = (e) => {
    setRoom_name(e.target.value);
  };

  const [laborHours, setLaborHours] = useState([0]);
  const handleLaborHoursChange = (e) => {
    setLaborHours(e.target.value);
  };

  const [items, setItems] = useState([]);
  const addItem = (e) => {
    e.preventDefault();

    const itemDesc = e.target["item_description"];
    const itemEstMatCost = e.target["item_estimated_material_cost"];
    const itemNotes = e.target["item_notes"];
    const ownerResp = e.target["owner_responsibilty"];

    const labCost = laborHours * 20;
    const matCost =
      isNaN(itemEstMatCost.value) === true ||
      typeof itemEstMatCost.value === "string"
        ? 0
        : parseFloat(itemEstMatCost.value);

    const newItem = {
      [itemDesc.id]: itemDesc.value,
      item_estimated_labor_hours: laborHours,
      item_estimated_labor_total: labCost,
      [itemEstMatCost.id]: matCost,
      item_estimated_total_cost: labCost + matCost,
      [itemNotes.id]: itemNotes.value,
      [ownerResp.id]: ownerResp.value,
    };

    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    const newList = [...items];
    newList.splice(index, 1);
    setItems(newList);
  };

  useEffect(() => {
    if (defaultItems !== null) {
      setItems(defaultItems);
    }
  }, []);

  return (
    <Card className={classes.roomCardRoot}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <TextField value={room_name} onChange={handleRoomNameChange} />
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              component="span"
              onClick={() => handleRemoveRoom(index)}
            >
              <DeleteForeverIcon
                fontSize="inherit"
                className={classes.deleteBtn}
              />
            </IconButton>
          </Grid>
        </Grid>

        {items && (
          <Grid container className={classes.roomCardBody}>
            <Grid item xs={12}>
              {items.map((item, index) => {
                return (
                  <Grid
                    container
                    justify="space-between"
                    key={`${room_name}-item-${index + 1}`}
                  >
                    <Grid item xs={1}>
                      <IconButton
                        size="small"
                        component="span"
                        onClick={() => removeItem(index)}
                      >
                        <HighlightOffIcon
                          fontSize="inherit"
                          className={classes.deleteBtn}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                      {item.item_description}
                    </Grid>
                    <Grid item xs={2}>
                      {item.item_estimated_total_cost}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        )}
      </CardContent>
      <CardActions>
        <Grid
          container
          alignItems="center"
          alignContent="center"
          justify="center"
        >
          <Grid item xs={12}>
            <AddItemModal
              roomName={room_name}
              handleAddItem={addItem}
              handleLaborHoursChange={handleLaborHoursChange}
              currentLaborHours={laborHours}
            />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
