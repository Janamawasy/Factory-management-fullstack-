import React, { useState , useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

function EmpListInShift({EmpList , callback}) {
    // EmpList : is al list of emloyees id in shift

    const urlEmp = 'http://localhost:8000/employees';

    const [employees,setemployees] = useState([])
    const [EmpsInShift,setEmpsInShift] = useState([]) // store all employees in shift 
    const [ToDelete,setToDelete] = useState([])


    // Get All employees data 
    const GetAllEmployees = async() =>{
        const { data } = await axios.get(urlEmp);
        setemployees(data);
    }

    useEffect(() => {
        GetAllEmployees();
      }, []);

    useEffect(() => {
        const empDataInShift = EmpList.reduce((empname, empId) => {
          const empInShift = employees.find((emp) => emp._id === empId);
          if (empInShift) {
            empname[empId] = `${empInShift.fname} ${empInShift.lname}`;
          }
          return empname;
        }, {});
        setEmpsInShift(empDataInShift);
        // EmpsInShift is object => {empid:empname}
      }, [EmpList, employees]);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  //'Checkbox demo'

    const handlechickbox = (event) => { // event.target.checked : true = checked , false = unchecked so should delete it from ToDelete uss
        if (event.target.checked === true){
            const newToDeleteItem = event.target.id;
            setToDelete((prevToDelete) => [...prevToDelete, newToDeleteItem])
        }else{
            const newtodelete = ToDelete.filter((tode)=>tode.EmpId !== event.target.id)
            setToDelete(newtodelete)
        }
        // callback(ToDelete)
    }

    // to callback with the updated version of ToDelete
    useEffect(() => {
        callback(ToDelete);
      }, [ToDelete, callback]);


    return (
        //  check box of all employees in shift to anable delete employees 
        <div style={{align:"center"}}> 
                <List sx={{  bgcolor: 'background.paper' }}>
                    {EmpList?.map((empid,index)=>
                        <ListItem key={index}>
                                <ListItemText primary={EmpsInShift[empid]} />
                                <Checkbox {...label} id={empid} onChange={(e)=>handlechickbox(e)} defaultChecked={false} sx={{color: pink[800],'&.Mui-checked': {color: pink[600],},}}/>
                        </ListItem>
                    )}
                </List>
                <br/><br/>
        </div>

    )
}

export default EmpListInShift
