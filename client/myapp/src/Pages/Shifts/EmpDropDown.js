import React from 'react';
import {useState , useEffect} from 'react'
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


function EmpDropDown({EmpList , callback}) {

    const urlEmp = 'http://localhost:8000/employees';

    const [employees,setemployees] = useState([]);
    const [EmpNotInShift,setEmpNotsInShift] = useState([]) // store all employees in shift 

    // Get All employees data 
    const GetAllEmployees = async() =>{
        const { data } = await axios.get(urlEmp);
        setemployees(data);
    }

    useEffect(() => {
        GetAllEmployees();
      }, []);

    
    useEffect(() => {
        const empDataNotInShift = employees.filter((emp) => !EmpList.includes(emp._id));
        const empNotsInShiftList = empDataNotInShift.map((emp) => ({
          id: emp._id,
          name: `${emp.fname} ${emp.lname}`,
        }));
        setEmpNotsInShift(empNotsInShiftList);
      }, [EmpList, employees]);


      const findNameById = (EmpId) =>{
        const empname = EmpNotInShift.find((emp)=>emp.id === EmpId).name
        return empname
    }

    // MUI CODE
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
        <div>EmpDropDown
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
          {EmpNotInShift?.map((Emp) => (
            <MenuItem
              key={Emp.id}
              value={Emp.id}
              style={getStyles(Emp, personName, theme)}
            >
              {Emp.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
        </div> 
    )
}

export default EmpDropDown
