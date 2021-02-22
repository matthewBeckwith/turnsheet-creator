import React from "react";

import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ButtonGroup,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import PrintIcon from "@material-ui/icons/Print";

export default function TurnsheetListItem({ index, turn }) {
  return (
    <ListItem divider key={`item-${turn.id}-${index}`}>
      <ListItemText
        primary={turn.address}
        secondary={`Total: $${turn.total_cost}    Created: ${Date(
          turn.created_at
        )}    Due: ${Date(turn.due_by).toLocaleString()}`}
      />
      <ListItemSecondaryAction edge="end">
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button>
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
