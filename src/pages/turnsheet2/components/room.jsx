import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import AddItemModal from "./addItemModal";

export default function Room({ roomName, index, handleRemoveRoom, defaultItems }) {
  const [room_name, setRoom_name] = useState(roomName);
  const handleRoomNameChange = (e) => {
    setRoom_name(e.target.value);
  }

  const [laborHours, setLaborHours] = useState([0.5]);
  const handleLaborHoursChange = (e) => {
    setLaborHours(e.target.value);
  }

  const [items, setItems] = useState([]);
  const addItem = (e) => {
    e.preventDefault();

    const itemDesc = e.target["item_description"];
    const itemEstMatCost = e.target["item_estimated_material_cost"];
    const itemNotes = e.target["item_notes"];
    const ownerResp = e.target["owner_responsibilty"];

    const newItem = {
      [itemDesc.id]: itemDesc.value,
      ['item_estimated_labor_hours']: laborHours,
      [itemEstMatCost.id]: itemEstMatCost.value,
      [itemNotes.id]: itemNotes.value,
      [ownerResp.id]: ownerResp.value,
    };

    setItems([...items, newItem]);
  };

  useEffect(() => {
    if(defaultItems !== null){
      setItems(defaultItems);
    }
  }, [])

  return (
    <Card>
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
                style={{ color: "#990a00" }}
              />
            </IconButton>
          </Grid>
        </Grid>

        {items && (
          <Grid container spacing={2}>
            {items.map((item, index) => {
              return (
                <Grid item xs={12} key={`${room_name}-item-${index + 1}`}>
                  {item.item_description}
                </Grid>
              );
            })}
          </Grid>
        )}
      </CardContent>
      <CardActions>
        <AddItemModal roomName={room_name} handleAddItem={addItem} handleLaborHoursChange={handleLaborHoursChange} currentLaborHours={laborHours} />
      </CardActions>
    </Card>
  );
}
