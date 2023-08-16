import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function AddDepComp() {
// dispatch({ type: 'UPDATE_PRODUCT', payload: {id, Name , Price , Quantity } })
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();


    const [ DepName , setDepName ] = useState('')
    const [ CancelClicked , setCancelClicked ] = useState(false)
    const [AddedMassage,setAddedMassage] = useState('')

    const handleAddDep = async () => {
        const urlDep = 'http://localhost:8000/departments';
        const obj = {'name':DepName}
        const { data } = await axios.post(urlDep,obj);
        setAddedMassage('New Department Created!')
        handleAction()
    }

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
            welcome to addDepartment

            <Box sx={{'& > :not(style)': { m: 1, width: '25ch' }}} >
                <TextField onChange={(e)=>setDepName(e.target.value)} label="Department Name" variant="outlined" />
            </Box>
            <br/>
            <Button onClick={handleAddDep} variant="contained" color="success" style={{ marginRight: '10px' }}>Add Department</Button>
            <Button onClick={()=>setCancelClicked(true)} variant="contained" color="success">cancle</Button>
            {CancelClicked && (
            <Navigate to="/main/DepartmentsPage" />
            )}
            <br/><br/>
            {AddedMassage && <div>{AddedMassage}</div>}
        </div>
    )
}

export default AddDepComp
