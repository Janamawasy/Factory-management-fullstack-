import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function AddEmployeeComp() {

    const location = useLocation();

    const [SelectedDep,setSelectedDep] = useState('')
    const [DepNames,setDepNames] = useState([])
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')
    const [startyear,setstartyear] = useState('')
    const [ CancelClicked , setCancelClicked ] = useState(false) 
    const [ AddedMassage , setAddedMassage ] = useState("") 


    const handleSelectDep = (e) => {
        setSelectedDep(e.target.value)
    }

    const handleAddEmp = async() => {
        const urlEmp = 'http://localhost:8000/employees';
        const obj = {'fname':fname,'lname':lname, 'departmentID':SelectedDep,'year':+startyear}
        const { data } = await axios.post(urlEmp,obj);
        setAddedMassage('New Employee Created!')
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
    
    //user full name passed from login page
    useEffect( () => {
        const GetDepNames = () => {
          const namef = location.state.depNames;
          setDepNames(namef);
        };
        GetDepNames();
      }, []);


    return (
        <div>
            <h2>Add New Employee:</h2>
           
            <br/><br/>
            <Box sx={{'& > :not(style)': { m: 1, width: '25ch' }}} >
                <TextField onChange={(e)=>setfname(e.target.value)} label="First Name" variant="outlined" />
                <TextField onChange={(e)=>setlname(e.target.value)} label="Last Name" variant="outlined" /> <br/>
                <TextField onChange={(e)=>setstartyear(e.target.value)} label="Start Work Year" variant="outlined" /><br/>
            </Box>
            
            <Box sx={{'& > :not(style)': { width: '25ch' },}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SelectedDep}
                    label="Department"
                    onChange={handleSelectDep}>
                        {DepNames.map((departname,index)=>
                        <MenuItem key={index} value={departname.id}>{departname.name}</MenuItem>
                    )}
                    </Select>
                </FormControl>
            </Box> 
            <br/><br/>
            <Button onClick={handleAddEmp} variant="contained" color="success" style={{ marginRight: '10px' }}>Add Employee</Button>
            <Button onClick={()=>setCancelClicked(true)} variant="contained" color="success">Cancle</Button>
            {CancelClicked && (
            <Navigate to="/main/EmployeesPage" />
            )}
            <br/><br/>
            {AddedMassage && <div>{AddedMassage}</div>}
            <br/><br/>

        </div>
    )
}

export default AddEmployeeComp
