import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function UsersComp() {
    //// fetch usersdb
    const urlUsersDB = "http://localhost:8000/usersDB";


    const [usersDB,setusersDB] = useState([]) 
    const [username,setUserName] = useState('')

// Fetch the data from the API and process it
    const fetchUsersDB = async () => {
        const { data } = await axios.get(urlUsersDB);
        setusersDB(data)
    };

    useEffect(()=>{
        fetchUsersDB();
    },[])



    return (
        <div>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Maximum Actions</TableCell>
            <TableCell align="right">Current Actions</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
               {usersDB.length > 0 ? (
              // Render when selected is true
              usersDB.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right"> {user.Name}</TableCell>
                  <TableCell align="right">{user.Actions_Num}</TableCell>
                  <TableCell align="right">{user.CurrentActions}</TableCell>
                  <TableCell align="right">{user.Date ?  new Date(user.Date).toLocaleDateString() : ''}</TableCell>

                </TableRow>
              )))
           : (
            // Render when employeesDEP is empty (loading)
            <TableRow>
              <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>   
        </div>

    )
}

export default UsersComp
