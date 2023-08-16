import React, { useState , useEffect} from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ManagerDropdown from './ManagerDropdown'
import EmpInDepList from './EmpInDepList';
import MultipleSelectChip from './MultipleSelectChip';
import Button from '@mui/material/Button';


function EditDepComp() {

    const urlEmp = 'http://localhost:8000/employees';
    const urlDep = 'http://localhost:8000/departments';

    const [depdata,setdepdata] = useState();
    const [managername,setmanagername] = useState();
    const [employees,setEmployees] = useState([]); 
    const [EmpInDep,setEmpInDep] = useState([]);  // all emp in the selected dep
    const [EmpNotInDep,setEmpNotInDep] = useState([]);  // all emp in the selected dep  
    const [DeleteDMessage,setDeleteDMessage] = useState(''); 
    const [EditedMessage,setEditedMessage] = useState('')


/// by these usesates we can recognaize change in dep data and updated!
    const [UpdateEmpDepID,setUpdateEmpDepID] = useState([]);  // emp id to be updated (update depid in employees)
    const [EmptoDelete,setEmpToDelete] = useState([]);  // emp id to be DELETE: delete dep.id from employees
    const [selectedmanagerID,setselectedmanagerID] = useState('') // emp id of the new selected manager
    const [NewName,setNewName] = useState('') // new department names          
    const [EditClicked,setEditClicked] = useState(false)  // when Edit Button is Clicked === true

    const location = useLocation();
    
// Get department data
    useEffect( () => {
        const GetDepData = () => {
            setdepdata(location.state.dep) // _id: depid , name : depname , manager : manager id
            setmanagername(location.state.managername)
            
        };
        GetDepData();
      }, []);

// Get All employees data 
    const GetAllEmployees = async() =>{
        const { data } = await axios.get(urlEmp);
        setEmployees(data);
    }
    useEffect(() => {
        GetAllEmployees();
      }, []);



    // get all employees in specific department
    const GetAllEmpInDep = () => {
        const EmpDep = employees.filter((emp) => emp.departmentID === depdata._id)
        setEmpInDep(EmpDep)
        const EmpNotInDep = employees?.filter((emp) => emp.departmentID !== depdata._id);
        setEmpNotInDep(EmpNotInDep)

    }
    useEffect(() => {
        GetAllEmpInDep();
      }, []);


    const handleChange = (event) => {
        const selectedValue = event.target.value;  //emp id of the selected manager
        setselectedmanagerID(selectedValue)
        setdepdata({ ...depdata, manager: selectedValue })}  //updating the selected manager in depdata


    const handleEditDep = async () => {
        try {
        // edit dep name in departments in case changed
            if (NewName) {
            const obj = { "name": depdata.name };
            const { data } = await axios.put(`${urlDep}/${depdata._id}`, obj);
          }
        // edit manager id in departments in case changed    
          if (selectedmanagerID) {
            const obj = { "manager": selectedmanagerID };
            const { data } = await axios.put(`${urlDep}/${depdata._id}`, obj);
          }
        // delete emp : delete dep.id from employees === update dep.id to blank     
          if (EmptoDelete.length > 0) {
            const obj = { "departmentID": "" };
            const DeleteEmployeeDepartments = async (empID) => {
              return axios.put(`${urlEmp}/${empID}`, obj);
            };
    
            await Promise.all(EmptoDelete.map((emp) => DeleteEmployeeDepartments(emp.EmpId)));
          }
        // add emp : update dep.id in employees     
          if (UpdateEmpDepID.length > 0) {
            const obj = { "departmentID": depdata._id };
            const updateEmployeeDepartments = async (empID) => {
              return axios.put(`${urlEmp}/${empID}`, obj);
            };
    
            await Promise.all(UpdateEmpDepID.map((emp) => updateEmployeeDepartments(emp)));
            setEditClicked(true)
          }
          handleAction()
          setEditedMessage("All changes have been applied successfully!")
          return(<div>
            All changes have been applied successfully!
          </div>)
        } catch (error) {
          console.error("Error occurred while applying changes:", error);
        }
      };

    const handleDeleteDep = async() => {
        try{
        // delete dep from departments
            const { data : deletedata } = await axios.delete(`${urlDep}/${depdata._id}`);
        // delete dep.id from its emp = update departmentID in employees department to empty depid
            const obj = { "departmentID": "" };
            const DeleteEmployeeDepartments = async (empID) => {
                return axios.put(`${urlEmp}/${empID}`, obj);};

            const EmpDep = employees.filter((emp) => emp.departmentID === depdata._id)
            await Promise.all(EmpDep.map((emp) => DeleteEmployeeDepartments(emp._id))); 
            await handleAction()
            setDeleteDMessage('Department has been Deleted Succesfully');


        } catch (error) {
            console.error("Error occurred while Deleting Department:", error);
        }

    };

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


    // setdepdata({ ...depdata, name: e.target.value })
    const handleEditDepName = (e) => {
        setNewName(e.target.value)
        setdepdata({ ...depdata, name: e.target.value })

    }

    const AddNewEmpsToDep = (employeesID) => {
        // employeesID is a list of emloyees id to add to department : update their department id 
        setUpdateEmpDepID(employeesID)
    }

    const handleToDelete = (todelete) => {
        // todelete is list of EmpId objects
        setEmpToDelete(todelete)
    }

    return (
        <div>
            <h2> Edit Departmant</h2>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Department name</TableCell>
                    <TableCell align="center">Department manager</TableCell>
                    <TableCell align="center">Department Employees</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {depdata ? (
                    // Render when selected is false
                        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>            
                            <TableCell align="center">
                                <Box sx={{'& > :not(style)': { m: 1, width: '25ch' }}} >
                                    <TextField
                                     value={depdata.name} 
                                     onChange={(e)=>handleEditDepName(e)} 
                                     variant="outlined" />
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                {/* component for edit manager dropdown */}
                                <ManagerDropdown depdata={depdata} employees={employees} handleChange={handleChange} />
                            </TableCell>
                            <TableCell align="center">
                                {/* component for employees list and DELETE CheckBox*/}
                                <EmpInDepList depdata={depdata} employees={employees} callback={handleToDelete}/>
                            </TableCell>
                        </TableRow>
                    ) : (
                    // Render when depdata is empty (loading)
                    <TableRow>
                    <TableCell colSpan={3}>Loading...</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>

            <br/><br/>
        {/* dropdown to add new emp to dep */}
            <MultipleSelectChip callback={AddNewEmpsToDep} depdata={depdata} employees={employees}/>

            <br/><br/>

            <Button onClick={handleEditDep} variant="contained" color="success" style={{ marginRight: '10px' }}>Edit Department</Button>
            <Button onClick={handleDeleteDep} variant="contained" color="success">Delete Department</Button>
            <br/><br/>
            {DeleteDMessage && <div>{DeleteDMessage}</div>}
            {EditedMessage && <div>{EditedMessage}</div>}
            <br/><br/>

        </div>
    )
}

export default EditDepComp
