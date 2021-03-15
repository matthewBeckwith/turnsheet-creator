import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LaborHoursDropdown({handleChange, laborHours}) {
  const classes = useStyles();
  const [options, setOptions] = useState([
    0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,
    5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,
  ]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="item_estimated_labor_hours_lbl">Labor Hours</InputLabel>
      <Select
        labelId="item_estimated_labor_hours_lbl"
        id="item_estimated_labor_hours"
        value={laborHours}
        onChange={handleChange}
      >
        {options.map((option, index) => {
            return (
              <MenuItem key={`option-${index}`} value={option}>
                {option}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
