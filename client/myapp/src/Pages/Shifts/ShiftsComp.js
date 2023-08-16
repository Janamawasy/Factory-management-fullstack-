import React from 'react'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DemoContainer , DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import EmpDropDown from './EmpDropDown';
import EmpListInShift from './EmpListInShift';
import EditShiftComp from './EditShiftComp';
import AddShiftComp from './AddShiftComp';





function ShiftsComp() {

    const dateInputRef = useRef(null);
    const dayjs = require('dayjs');


    const urlShft = 'http://localhost:8000/shifts';
    const urlEmp = 'http://localhost:8000/employees';


    const [shifts,setshifts] = useState([]);
    const [employees,setemployees] = useState([]); 
    const [AddShift,setAddShift] = useState(false)

    // Get All shifts data 
    const GetAllShifts = async() => {
        const { data } = await axios.get(urlShft);
        setshifts(data);
    }

    // Get All employees data 
    const GetAllEmployees = async() =>{
        const { data } = await axios.get(urlEmp);
        setemployees(data);
    }

    useEffect(() => {
        GetAllShifts()
        GetAllEmployees();
      }, []);

    const handleAddShift = () => {
        setAddShift(true)
    }



    return (
        <div>

            {/* all shifts data editable*/}
            {/* add employees to exesting shifts */}
            {/* add shifts */}
            {/* edit shifts Button => save data */}

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell> {/*  shift's number */}
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Starting Hour</TableCell>
            <TableCell align="center">Ending Hour</TableCell>
            <TableCell align="center">Employees in Shift</TableCell>  {/*  anable delete employees from shift with checkbox */}
            <TableCell align="center">Add Employees to Shift</TableCell>
            <TableCell align="center"> </TableCell> {/*  SAVE Button */}

          </TableRow>
        </TableHead>
        <TableBody>
               {shifts.length > 0 ? (
              // Render when selected is false
              shifts.map((shft, index) => (
                    <EditShiftComp key={index} shft={shft} index={index}/>
            ))) : (
            // Render when employeesDEP is empty (loading)
            <TableRow>
              <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

            <br/><br/>
            <Button variant="contained" color="success" style={{ marginRight: '10px' }} onClick={handleAddShift}>Add Shift</Button>
            {AddShift ? (<AddShiftComp/>):(null)}
            <br/><br/>
                
        </div>
    )
}

export default ShiftsComp



