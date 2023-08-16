import React, { useState , useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function EmployeesPComp() {
    const urlEmp = 'http://localhost:8000/employees';
    const urlShft = 'http://localhost:8000/shifts';

    const [employees,setEmployees] = useState([])
    const [shifts,setShifts] = useState([])
    const [selectedemployees,setSelectedEmployees] = useState([])
    const [employeesDEP,setEmployeesDEP] = useState([])
    const [depNames,setDepNames] = useState([])
    const [filtervalue,setFiltervalue] =useState('')
    const [filtername,setFiltername] =useState('')
    const [selected, setSelected] = useState(false) // true = department filter selected, false= select all departments setIsClicked
    const [IsClicked, setIsClicked] = useState(false) // true = Edit employee button is clicked


// Get All employees data 
    const GetAllEmployees = async() =>{
        const { data } = await axios.get(urlEmp);
        setEmployees(data);
    }

// Get All Shifts Data
    const GetShiftsData = async () => {
      const {data} = await axios.get(urlShft)
      setShifts(data);
    }

    useEffect(() => {
        GetAllEmployees();
        GetShiftsData();
      }, []);
  

// Find Department Name By Department Id
    const findDepByID = async(DepID) => {
      try{
        const urlDep = 'http://localhost:8000/departments'
        const { data } = await axios.get(`${urlDep}/${DepID}`);
        return {depid:data._id,name: data.name}
      }catch(error){
        console.log(DepID)
      }
    }

    /// create employeesDEP : object of each employee's department name and id (with repeat)
    useEffect(() => {
        // Create an array of promises by calling findDepByID for each employee's departmentID
        const promises = employees.map((emp) => findDepByID(emp.departmentID));
        // Wait for all promises to resolve and get the department names
        Promise.all(promises).then((departmentNames) => {
          setEmployeesDEP(departmentNames);
        });
      }, [employees]);


    /// create depNames : object of each dep name and id (without repeat)
    useEffect(() => {
        // Create a unique list of department names with their IDs
        const uniqueDepartments = employeesDEP.reduce((acc, empdep) => {
          if (empdep.name && empdep.depid) { // Check if both name and id are defined
            const existingDepartment = acc.find((dep) => dep.name === empdep.name);
            if (!existingDepartment) {
                acc.push({ name: empdep.name, id: empdep.depid });
            }
          }
            return acc;
        }, []);
    
        // Set the unique department names and IDs in the state
        setDepNames(uniqueDepartments);
    }, [employeesDEP]);



// filtering employees list by department 
    const GetEmployeesByDep = async(DepId) =>{
        if (DepId !== -1){
            const { data } = await axios.get(`${urlEmp}/Dep/${DepId}`);
            setSelectedEmployees(data)
            setSelected(true)
        }else{
            // DepId === -1 means selsct all :
            setSelected(false)
        }
       
    }

// get department name by department id
    const getnamebydepid = (depid) => {
        const wantedDep = depNames.find((depname)=>depname.id == depid)
        return wantedDep ? wantedDep.name : '';
        }

// Filtering employees list by department
    const handleDepFilter = (event) => {
        const selectedValue = event.target.value;
        setFiltervalue(selectedValue); // Set the selected department value
    };

// Trigger fetching employees when filtervalue changes
    useEffect(() => {
        // Fetch employees based on the selected department
        if (filtervalue !== '') {
        const departmentName = getnamebydepid(filtervalue);
        setFiltername(departmentName);
        GetEmployeesByDep(filtervalue);
        }
    }, [filtervalue]);

    const GetShiftOfEmp = (EmpId) =>{
        const shiftsWithEmpId = shifts.filter((shift) => shift.EmpInShift.includes(EmpId));
        return( 
          <div>
              {shiftsWithEmpId.map((shft,index) =>
              <li key={index}>
                Date: {shft.date.substring(0, 10)} <br/>
                Time: {shft.startH}:00 - {shft.endH}:00 <br/><br/>
              </li>
              )}
          </div>
          )}


    return (
        <div>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right">Employee Shifts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
               {employeesDEP.length > 0 ? (
            selected ? (
              // Render when selected is true
              selectedemployees.map((emp, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right"> 
                        <Link to="/main/edit-employee-page" state={{ emp:emp,depnames: depNames}}>
                            {emp.fname} {emp.lname}
                        </Link>
                  </TableCell>
                  <TableCell align="right">{filtername}</TableCell>
                  <TableCell align="right">{GetShiftOfEmp(emp._id)}</TableCell>

                </TableRow>
              ))
            ) : (
              // Render when selected is false
              employees.map((emp, index) => (
                <TableRow
                  key={emp._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >            
                  <TableCell align="right">
                        <Link to="/main/edit-employee-page" state={{ emp:emp,depnames: depNames}}>
                            {emp.fname} {emp.lname}
                        </Link>
                  </TableCell>
                  <TableCell align="right">{employeesDEP[index].name}</TableCell>
                  <TableCell align="right">{GetShiftOfEmp(emp._id)}</TableCell>
                </TableRow>
              ))
            )
          ) : (
            // Render when employeesDEP is empty (loading)
            <TableRow>
              <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    <br/><br/>

        <Button onClick={()=>setIsClicked(true)} variant="contained" color="success">New Employee</Button>
        {IsClicked && (
            <Navigate to="/main/new-employee-page" state={{ depNames }}/>
            )}

    <br/><br/>

    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filtervalue}
          label="Department"
          onChange={handleDepFilter}
        ><MenuItem value={-1}>Select All</MenuItem>
            {depNames.map((departname,index)=>
            <MenuItem key={index} value={departname.id}>{departname.name}</MenuItem>
        )}
        </Select>
      </FormControl>
    </Box>
    <br/><br/>

        </div>
    )
}

export default EmployeesPComp





