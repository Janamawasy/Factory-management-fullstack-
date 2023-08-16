import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

function MultipleSelectChip({ depdata, employees, callback}) {

    const EmpNotInDep = employees?.filter((emp) => emp.departmentID !== depdata._id);

    const findNameById = (EmpId) =>{
        const emp = EmpNotInDep.find((emp)=>emp._id === EmpId)
        return (`${emp?.fname} ${emp?.lname}`)
    }
        
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// export default function MultipleSelectChip({names}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    // callback new employees id from child comp to parent comp 
    callback(value)
    };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Add Employees</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Add Employees" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={findNameById(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {EmpNotInDep.map((name) => (
            <MenuItem
              key={name._id}
              value={name._id}
              style={getStyles(name, personName, theme)}
            >
              {`${name?.fname} ${name?.lname}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
 );
}

export default MultipleSelectChip;
