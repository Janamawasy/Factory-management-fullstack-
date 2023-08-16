import { useState , useEffect } from 'react'
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';


function DepartmentsComp() {

    const urlDep = 'http://localhost:8000/departments';
    const urlEmp = 'http://localhost:8000/employees';

    const [departments,setDepartments] = useState([]);
    const [employees,setEmployees] = useState([]); 
    const [IsClicked,setIsClicked] = useState(false);

    // Get All departments data 
    const GetAllDepartments = async() =>{
        const { data } = await axios.get(urlDep);
        setDepartments(data);
    }
    useEffect(() => {
        GetAllDepartments();
      }, []);

    // Get All employees data 
    const GetAllEmployees = async() =>{
        const { data } = await axios.get(urlEmp);
        setEmployees(data);
    }
    useEffect(() => {
        GetAllEmployees();
      }, []);

    // get employee name by his id, had the id from dep.manager
    const GetEmpNameByID = (managerID) => {
        const EmpName = employees?.find((emp)=>emp._id === managerID)
        return `${EmpName?.fname} ${EmpName?.lname}`;
    }

    // get depNames => dep names and dep id without repeating
    const makeDepNames = () => {
        const depNames = departments.map((department) => {
            return { name: department.name, id: department._id };
          });
          return depNames;
    }

    const depNames = makeDepNames()

    // get all employees in specific department
    const GetAllEmpInDep = (DepId) => {
        const EmpInDep = employees?.filter((emp) => emp.departmentID === DepId)
        return (
            <div style={{align:"center"}}> 
                <List sx={{  bgcolor: 'background.paper' }}>
                    {EmpInDep.map((emp,index)=>
                        <ListItem key={index}>
                            <Link to="/main/edit-employee-page" state={{ emp:emp ,depnames: depNames}}> 
                                <ListItemText primary={`${emp?.fname} ${emp?.lname}`} />
                            </Link>
                        </ListItem>
                    )}
                </List>
            </div>
        )
    }


    return (
        <div>

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
               {departments.length > 0 ? (
              // Render when selected is false
              departments.map((dep, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>            
                    <TableCell align="center">
                        <Link to="/main/edit-department-page" state={{ dep:dep, managername:GetEmpNameByID(dep.manager)}}>
                            {dep.name}
                        </Link>
                    </TableCell>
                    <TableCell align="center">{GetEmpNameByID(dep.manager)}</TableCell>
                    <TableCell align="center">{GetAllEmpInDep(dep._id)}</TableCell>
                </TableRow>
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
    
    <Button onClick={()=>setIsClicked(true)} variant="contained" color="success">New Department</Button>
        {IsClicked && (
            <Navigate to="/main/new-department-page" state={{ depNames }}/>
            )}
        </div>

        

    )
}

export default DepartmentsComp
