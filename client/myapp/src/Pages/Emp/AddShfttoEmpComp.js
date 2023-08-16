import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddShfttoEmpComp({EmpId}) {

    const urlShft = 'http://localhost:8000/shifts';

    const [shifts,setShifts] = useState([]) 
    const [NewShft,setNewShft] = useState('')
    const [AddShiftMassage,setAddShiftMassage] = useState('')

    // Get All Shifts Data
    const GetShiftsData = async () => {
        const {data} = await axios.get(urlShft)
        setShifts(data);
      }
  
      useEffect(() => {
          GetShiftsData();
        }, []);


    const shiftsWithEmpId = shifts.filter((shift) => shift.EmpInShift.includes(EmpId));
    const shiftsWithOUTEmpId = shifts.filter((shift) => !shift.EmpInShift.includes(EmpId));
        
    const handleChange = (event) => {
        setNewShft(event.target.value);
    };

    const handleSaveNewShift = async() => {
        const {data : shftdata} = await axios.get(`${urlShft}/${NewShft}`)
        const obj = {"EmpInShift" : shftdata.EmpInShift.concat(EmpId)}
        const {data} = await axios.put(`${urlShft}/${NewShft}`,obj)
        setAddShiftMassage('New Shift Added to Employee!')
        handleAction()
    }

    // handle action in usersDB => current action +1
    const handleAction = async() => {
        const urlUsersDB = "http://localhost:8000/usersDB";
        const userID = localStorage.getItem('userID')
    
        // // +1 to current actions, if logoutRequired so current actions = max actions => log out
        await axios.put(`${urlUsersDB}/${userID}/actions`) // +1 to current actions
        .then(response => {
            const data = response.data;
    
            if (data.logoutRequired) {
              // Redirect to login page
              window.location.href = '/';  
            
            }}).catch((error)=>{
                console.log(error)
            })  
    }


    return (
        <div>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"> </TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Starting Hour</TableCell>
            <TableCell align="center">Ending Hour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shiftsWithEmpId.map((shft,index) => (
            <TableRow key={shft._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row"> {index +1}  </TableCell>
              <TableCell align="right">{shft.date.substring(0, 10)}</TableCell>
              <TableCell align="right">{shft.startH}:00</TableCell>
              <TableCell align="right">{shft.endH}:00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

<br/><br/><br/>
    {/* // dropdown to select new shift: */}
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">New Shift</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={NewShft}
          label="New Shift"
          onChange={handleChange}
        >{shiftsWithOUTEmpId.map((shft)=>
            <MenuItem value={shft._id}>Date : {shft.date.substring(0, 10)}  ,  Time: {shft.startH}:00 - {shft.endH}:00 </MenuItem>
        
        )}
        </Select>
      </FormControl>
    </Box>
    <br/>
        <Button variant="contained" color="success" onClick={handleSaveNewShift}>Register Employee to New Shift</Button>
        <br/><br/>
        {AddShiftMassage && <div>{AddShiftMassage}</div>}
        
<br/><br/><br/>


        </div>
    )
}

export default AddShfttoEmpComp
