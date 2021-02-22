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


function parseDate(d){
  const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const tempDate = new Date(d);
  const tempDayString = days[tempDate.getDay()];
  const tempDayNumber = tempDate.getDate();
  const tempMonthString = months[tempDate.getMonth()];
  const tempYear = tempDate.getFullYear();

  return `${tempDayString}, ${tempDayNumber} ${tempMonthString} ${tempYear}`;
}

export default function TurnsheetListItem({ index, turn }) {
  return (
    <ListItem divider key={`item-${turn.id}-${index}`}>
      <ListItemText
        primary={turn.address}
        secondary={`Total: $${turn.total_cost}    Created: ${parseDate(turn.created_at)}    Due: ${parseDate(turn.due_by)}`}
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
