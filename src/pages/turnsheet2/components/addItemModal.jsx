import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Checkbox,
} from "@material-ui/core";
import LaborHoursDropdown from "./laborHoursDropdown";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddItemModal({ roomName, handleAddItem, handleLaborHoursChange, currentLaborHours }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Add Item
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        onSubmit={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Add an Item to{" "}
              <span style={{ textTransform: "capitalize" }}>{roomName}</span>
            </h2>
            <form onSubmit={handleAddItem}>
              <TextField id="item_description" label="Item Description" />
              <LaborHoursDropdown handleChange={handleLaborHoursChange} laborHours={currentLaborHours} />
              <TextField
                id="item_estimated_material_cost"
                label="Material Cost"
              />
              <TextField id="item_notes" label="Notes" />
              <Checkbox id="owner_responsibilty" label="Owner Responsibility" />
              <Button type="submit">ADD</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
