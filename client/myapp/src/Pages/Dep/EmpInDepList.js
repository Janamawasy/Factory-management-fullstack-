import React, { useState , useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';



function EmpInDepList ({ depdata, employees, callback }) {

    const EmpInDep = employees?.filter((emp) => emp.departmentID === depdata._id);

    const [ToDelete,setToDelete] = useState([])

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  //'Checkbox demo'

    const handlechickbox = (event) => { // event.target.checked : true = checked , false = unchecked so should delete it from ToDelete uss
        if (event.target.checked === true){
            const newToDeleteItem = {EmpId: event.target.id};
            setToDelete((prevToDelete) => [...prevToDelete, newToDeleteItem])
        }else{
            const newtodelete = ToDelete.filter((tode)=>tode.EmpId !== event.target.id)
            setToDelete(newtodelete)
        }
    }

    useEffect(() => {
        // This callback will be called every time ToDelete changes
        callback(ToDelete);

      }, [ToDelete]);

    return (
            <div style={{align:"center"}}> 
                <List sx={{  bgcolor: 'background.paper' }}>
                    {EmpInDep.map((emp,index)=>
                        <ListItem key={index}>
                            {/* <Link to="/main/edit-employee-page" state={{ emp:emp ,depnames: depNames}}>  */}
                                <ListItemText primary={`${emp?.fname} ${emp?.lname}`} />
                                <Checkbox {...label} id={emp._id} onChange={(e)=>handlechickbox(e)} defaultChecked={false} sx={{color: pink[800],'&.Mui-checked': {color: pink[600],},}}/>
                            {/* </Link> */}
                        </ListItem>
                    )}
                </List>
                <br/><br/>
            </div>
    )
}

export default EmpInDepList
