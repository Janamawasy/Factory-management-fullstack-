import React from 'react'
import { useState } from 'react';
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
import axios from 'axios';

function AddShiftComp() {

    const urlShft = "http://localhost:8000/shifts"

    const [startHour, setStartHour] = useState();
    const [endtHour, setEndHour] = useState(); 
    const [NewDate, setNewDate] = useState(); 
    const [NewShift,setNewShift] = useState('')

    const [AddEmpIdToShft,setAddEmpIdToShft] = useState([]); // list of emp id to add in shift


    const handleNewDate = (event) => {
        /// automaticlly event.$d is the date before the selected date, so se set the date for the next day:
        const nextDay = new Date(event.$d);
        nextDay.setDate(event.$d.getDate() + 1);
        setNewDate(nextDay.toISOString())
    }

    const handleAddEmp = (event) => {
        setEndHour(event.$H);

    }

    const handlestartH = (event) => {
        setStartHour(event.$H);
    }



    const AddNewEmpsToShift = (employeesID) => {
        // employeesID is a list of emloyees id to add to department : update their department id 
        setAddEmpIdToShft(employeesID)
    }

    const GetDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = date.getMonth() +1 ; // Add 1 because months are zero-based (0-11)
        const day = date.getDate() -1 ;
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return dayjs(formattedDate)
    }

    const GetHour = (hour) => {
        const hourNumber = hour -2; // Assuming the hour is 8
        const time = dayjs(`1970-01-01T${hourNumber}:00:00.000Z`, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        return time;
    }

    const handleSaveNewShift = async() => {
        const newShft = {"date":NewDate,"startH":startHour,"endH":endtHour,"EmpInShift":AddEmpIdToShft}
        const {data} = await axios.post(urlShft,newShft)
        handleAction()
        setNewShift('New Shift Added')
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
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>            
                    <TableCell align="center"> </TableCell>
                    <TableCell align="center">
                        {/* <input type="date" ref={dateInputRef} defaultValue={GetDate(shft.date)}/><br/> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker  onChange={(e)=>handleNewDate(e)} /> 
                                {/* value={GetDate(NewDate)} */}
                            </DemoContainer>
                        </LocalizationProvider>
                    </TableCell>

                    <TableCell align="center">
                            {/* <TextField InputProps={{ readOnly: false }} value={shft.startH} type="number" onChange={(e)=>handlestartH(e)} variant="outlined" /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']}>
                                    <DemoItem >
                                        <TimePicker  onChange={(e)=>handlestartH(e)} />
                                        {/* value={GetHour('startHour')} */}
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                    </TableCell>
                    <TableCell align="center">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['MobileTimePicker', 'MobileTimePicker', 'MobileTimePicker']}>
                                    <DemoItem >
                                        <TimePicker  onChange={(e) => handleAddEmp(e)}/>
                                        {/* value={GetHour(endtHour)} */}
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                    </TableCell>

                    {/* <TableCell align="center"><EmpListInShift EmpList={shft.EmpInShift} callback={handleToDelete}/></TableCell> */}
                    <TableCell align="center"><EmpDropDown EmpList={[]} callback={AddNewEmpsToShift}/></TableCell>
                    <TableCell align="center">
                                    <Button variant="contained" color="success" onClick={handleSaveNewShift}>Add New Shift</Button>
                                    <br/><br/>
                                    {NewShift && <div>{NewShift}</div>}
                    </TableCell>

                </TableRow>
        </div>
    )
}

export default AddShiftComp
