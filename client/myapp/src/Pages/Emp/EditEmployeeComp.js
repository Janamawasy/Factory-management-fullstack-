import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddShfttoEmpComp from './AddShfttoEmpComp';


function EditEmployeeComp() {

    const urlEmp = 'http://localhost:8000/employees';
    const location = useLocation();

    const [Empid,setEmpid] = useState('')
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')
    const [startyear,setstartyear] = useState('')
    const [depaertment,setdepaertment] = useState('')
    const [depaertmentID,setdepaertmentID] = useState('')
    const [depNames,setDepNames] = useState([])
    const [SelectedDep,setSelectedDep] = useState('')  
    const [EditedMassage,setEditedMassage] = useState('')  
    const [DeletedMassage,setDeletedMassage] = useState('')  


    // user full name passed from login page
    useEffect( () => {
        const GetEmpData = () => {
          const empdata = location.state.emp
          const depnamesbeforefilter = location.state.depnames
          const depnames = depnamesbeforefilter.filter((item) => item.name !== undefined && item.id !== undefined);

          if(empdata.departmentID){
            const depname = depnames.find((dep)=>dep.id === empdata.departmentID).name;
            setdepaertment(depname);

          }else{
            const depname = '';
            setdepaertment(depname);
          }

          setEmpid(empdata._id)
          setfname(empdata.fname);
          setlname(empdata.lname);
          setstartyear(empdata.year);
          if (empdata.departmentID){
            setdepaertmentID(empdata.departmentID);
            setSelectedDep(empdata.departmentID);
          }
          setDepNames(depnames)

        };
        GetEmpData();
      }, []);


      const handleSelectDep = (e) => {
        setSelectedDep(e.target.value)
      }

      const handleEditEmp = async () => {
        const obj = {"fname": fname,"lname":lname,"year":+startyear,"departmentID":SelectedDep}
        const { data } = await axios.put(`${urlEmp}/${Empid}`,obj);
        setEditedMassage('Employee has been edited!')
        handleAction()
      }

      const handleDeleteEmp = async () => {
        const { data } = await axios.delete(`${urlEmp}/${Empid}`);
        setDeletedMassage('Employee Deleted!')
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
            <h1> Edit Employee </h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{display: 'flex', flexWrap: 'wrap','& > :not(style)': { m: 1, width: '25ch' }}} >
                    <TextField value={fname} onChange={(e)=>setfname(e.target.value)} label="First Name" variant="outlined" />
                    <TextField value={lname} onChange={(e)=>setlname(e.target.value)} label="Last Name" variant="outlined" /> <br/>
                    <TextField value={startyear} onChange={(e)=>setstartyear(e.target.value)} label="Start Work Year" variant="outlined" /><br/>
                </Box>
            </div>

            <Box sx={{'& > :not(style)': { width: '25ch' },}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SelectedDep}
                    label="Department"
                    onChange={handleSelectDep}>
                        {depNames.map((departname,index)=>
                        <MenuItem key={index} value={departname.id}>{departname.name}</MenuItem>
                    )}
                    </Select>
                </FormControl>
            </Box> 
            <br/><br/>
            <Button onClick={handleEditEmp} variant="contained" color="success">Edit Employee</Button>
            <br/><br/>
            <Button onClick={handleDeleteEmp} variant="contained" color="success">Delete Employee</Button>
            <br/><br/>
            {DeletedMassage && <div>{DeletedMassage}</div>}
            {EditedMassage && <div>{EditedMassage}</div>}

        <br/><br/>

        <AddShfttoEmpComp EmpId={Empid}/>
        </div>
    )
}

export default EditEmployeeComp
