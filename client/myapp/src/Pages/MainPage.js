import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {  NavLink} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

function MainPage() {
  const [name,setName] = useState('')
  const [usersDB,setusersDB] = useState([])

  const location = useLocation();

  const urlusersDB = "http://localhost:8000/usersDB"

  //authentication:
    const url = 'http://localhost:8000/main';
      const getProducts = async () => {
        const accessToken = sessionStorage['accessToken'];

        const resp = await fetch(url, {
          method: 'get',
          headers: { 'x-access-token': accessToken },
        });
        const data = await resp.json();
      };

  //Logout butten location
      const logoutStyles = {
        position: 'absolute',
        top: '10px', // Adjust the top position as needed
        right: '10px', // Adjust the right position as needed
      };

 // get username from location state
  useEffect( () => {
        const Getname = () => {
          const namef = location.state && location.state.name;
          setName(namef);
          localStorage.setItem("username", namef)
          
        };
        Getname();
      }, []);

  // get user id by username 
  const GetUserIDByUsername =async (username) => {
    const {data:usersdata} = await axios.get(urlusersDB)
    const user = usersdata.find((user)=>user.Name === username)
    localStorage.setItem("userID", user._id)
    return user._id
  }

  //
function handleUserID(userID) {

  // const userId = GetUserIDByUsername(name); 
  const requestBody = { userId: userID };

  // Make subsequent requests with the userId in the request body
  fetch(urlusersDB, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
    })
    .catch((error) => {
      // Handle errors here
    });
}

// CHECK User Actions in userDB: if its new date, set date and current actions, 
// if it the same day and user reach max actions redirect to login page
const handleUserActions = async (userId) => {
  const {data : user} = await axios.get(`${urlusersDB}/${userId}`) //
  const currentDate = new Date().toLocaleDateString()
  const userDate = user.Date ? new Date(user.Date).toLocaleDateString() : ''
  if (userDate === currentDate && user.Actions_Num === user.CurrentActions){
    window.location.href = '/'
  }
  if (userDate !== currentDate){
    user.Date = new Date();
    user.CurrentActions = 0;
    await axios.put(`${urlusersDB}/${userId}`,user)
  }
}

useEffect(() => {
  if (name) {
    async function fetchUserIdAndHandle() {
      try {
        const userId = await GetUserIDByUsername(name);
        handleUserID(userId);
        handleUserActions(userId)
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    }
    fetchUserIdAndHandle();
  }
}, [name]);



  // styling deviders
      const dividerStyle = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',       
      };

    return (

        <div> 
          <div style={logoutStyles}> 
            <Button variant="contained" href="/">Logout</Button>
          </div>
            welcome to main page<br/>
            name: {name}<br/><br/><br/>

          {/* User, Department, Employee and Shift list*/}
            <List sx={dividerStyle} component="nav" aria-label="mailbox folders">
                  <ListItem button >
                    <NavLink to='UsersPage' underline="none">
                      <ListItemText primary="Users" />
                    </NavLink>
                  </ListItem>
                  <Divider />

                  <ListItem button divider>
                    <NavLink to='EmployeesPage' underline="none">
                      <ListItemText primary="Employees" />
                    </NavLink>
                  </ListItem>

                  <ListItem button>
                    <NavLink to='ShiftsPage' underline="none">
                      <ListItemText primary="Shifts" />
                    </NavLink>
                  </ListItem>

                  <Divider light />

                  <ListItem button>
                    <NavLink to='DepartmentsPage' underline="none">
                      <ListItemText primary="Departments" />
                    </NavLink>
                  </ListItem>
                </List>
                <Outlet />

        </div>
    )
}

export default MainPage
