import React, { useState } from "react";
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

export default function Room({ roomName, index, handleRemoveRoom }) {
  const [items, setItems] = useState([]);
  const addItem = (e) => {
    e.preventDefault();

    const itemDesc = e.target["item_description"];
    const itemLaborHrs = e.target["item_estimated_labor_hours"];
    const itemEstMatCost = e.target["item_estimated_material_cost"];
    const itemNotes = e.target["item_notes"];
    const ownerResp = e.target["owner_responsibilty"];

    const newItem = {
      [itemDesc.id]: itemDesc.value,
      [itemLaborHrs.id]: itemLaborHrs.value,
      [itemEstMatCost.id]: itemEstMatCost.value,
      [itemNotes.id]: itemNotes.value,
      [ownerResp.id]: ownerResp.value,
    };

    setItems([...items, newItem]);
  };

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
                <Grid item xs={12} key={`${roomName}-item-${index + 1}`}>
                  {item.item_description}
                </Grid>
              );
            })}
          </Grid>
        )}
      </CardContent>
      <CardActions>
        <AddItemModal roomName={roomName} handleAddItem={addItem} />
      </CardActions>
    </Card>
  );
}
