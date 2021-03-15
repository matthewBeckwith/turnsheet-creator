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

export default function LaborHoursDropdown() {
  const classes = useStyles();
  const [laborHours, setLaborHours] = useState(0.5);
  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    setLaborHours(event.target.value);
  };

  useEffect(() => {
    while (options.length < 25) {
      if (options.length === 0) {
        setOptions([0.5]);
      } else {
        const newValue = options[options.length - 1] + 0.5;
        setOptions([...options, newValue]);
      }
    }
  }, []);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="item_estimated_labor_hours_lbl">Labor Hours</InputLabel>
      <Select
        labelId="item_estimated_labor_hours_lbl"
        id="item_estimated_labor_hours"
        value={laborHours}
        onChange={handleChange}
      >
        {options.length === 25 ? (
          options.map((option, index) => {
            return (
              <MenuItem key={`option-${index}`} value={option}>
                {option}
              </MenuItem>
            );
          })
        ) : (
          <pre>Loading...</pre>
        )}
      </Select>
    </FormControl>
  );
}
