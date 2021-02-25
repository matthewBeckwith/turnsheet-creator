import React from "react";

import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ButtonGroup,
  Button,
  Grid,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import PrintIcon from "@material-ui/icons/Print";
import { Link } from "react-router-dom";

export default function TurnsheetListItem({ index, year, turn }) {
  return (
    <ListItem divider key={`${year}-item-${index}`}>
      <ListItemText
        primary={turn.address}
        secondary={
          <Grid component="span" container spacing={2}>
            <Grid component="span" item xs={12} sm={3}>
              <small>Total: ${turn.total_cost}</small>
            </Grid>
            <Grid component="span" item xs={12} sm={3}>
              <small>Created: {turn.created_at}</small>
            </Grid>
            <Grid component="span" item xs={12} sm={3}>
              <small>Due: {turn.due_by}</small>
            </Grid>
          </Grid>
        }
      />
      <ListItemSecondaryAction edge="end">
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          size="small"
        >

            <Button component={Link} to={`/edit_turnsheet/${turn.turnsheet_id}`}>
            <EditIcon />
          </Button>

          
          <Button>
            <SearchIcon />
          </Button>
          <Button>
            <PrintIcon />
          </Button>
          <Button>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
