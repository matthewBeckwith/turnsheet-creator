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

export default function LaborHoursDropdown({ handleChange, laborHours }) {
  const classes = useStyles();
  const [options, setOptions] = useState([
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    10,
    10.5,
    11,
    11.5,
    12,
    12.5,
    13,
    13.5,
    14,
    14.5,
    15,
    15.5,
    16,
    16.5,
    17,
    17.5,
    18,
    18.5,
    19,
    19.5,
    20,
    20.5,
    21,
    21.5,
    22,
    22.5,
    23,
    23.5,
    24,
    24.5,
    25,
    25.5,
    26,
    26.5,
    27,
    27.5,
    28,
    28.5,
    29,
    29.5,
    30,
    30.5,
    31,
    31.5,
    32,
    32.5,
    33,
    33.5,
    34,
    34.5,
    35,
    35.5,
    36,
    36.5,
    37,
    37.5,
    38,
    38.5,
    39,
    39.5,
    40,
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
