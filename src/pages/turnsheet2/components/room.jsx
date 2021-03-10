import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function Room({ roomName, index, handleRemoveRoom }) {
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
      </CardContent>
      <CardActions>
        <Button size="small">Add Item</Button>
      </CardActions>
    </Card>
  );
}
