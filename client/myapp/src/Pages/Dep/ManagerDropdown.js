import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function ManagerDropdown({ depdata, employees, handleChange }) {

  const EmpInDep = employees?.filter((emp) => emp.departmentID === depdata._id);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={depdata.manager} // manager id === emp id
            label="Age"
            onChange={handleChange}
          >
            {EmpInDep.map((emp) => (
              <MenuItem key={emp._id} value={emp._id}>{`${emp?.fname} ${emp?.lname}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default ManagerDropdown;
