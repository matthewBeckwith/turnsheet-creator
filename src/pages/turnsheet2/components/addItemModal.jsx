import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Checkbox,
  Grid,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
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

export default function AddItemModal({
  roomName,
  handleAddItem,
  handleLaborHoursChange,
  currentLaborHours,
}) {
  const classes = useStyles();

  const [submitBtnLock, setSubmitBtnLock] = useState(true);
  const handleBtnLock = (e) => {
    if (e.target.value === "") {
      setSubmitBtnLock(true);
    } else {
      setSubmitBtnLock(false);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSubmitBtnLock(true);
  };

  const [ownerResponsibility, setOwnerResponsibility] = useState(false);
  const handleOwnerResponsibility = () => {
    setOwnerResponsibility(!ownerResponsibility);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        aria-label="add item"
        fullWidth
        onClick={handleOpen}
        disableElevation
      >
        <AddIcon /> <span style={{ marginLeft: 25 }}>ADD ITEM</span>
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
            <form autoComplete="off" onSubmit={handleAddItem}>
              <Grid container justify="space-evenly" spacing={1}>
                <Grid item>
                  <TextField
                    id="item_description"
                    label="Item Description"
                    onChange={handleBtnLock}
                    fullWidth
                    xs={12}
                    sm={6}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LaborHoursDropdown
                    handleChange={handleLaborHoursChange}
                    laborHours={currentLaborHours}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="item_estimated_material_cost"
                    label="Material Cost"
                    defaultValue={0}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="item_notes"
                    label="Notes"
                  />
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="owner_responsibilty"
                          value={ownerResponsibility}
                          onChange={handleOwnerResponsibility}
                          name="owner_responsibilty"
                        />
                      }
                      label="Owner Responsibility"
                    />
                  </FormGroup>
                </Grid>
                <Grid item>
                  <Button type="submit" disabled={submitBtnLock}>
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
