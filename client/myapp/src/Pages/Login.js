
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode'
import axios from 'axios';

function Login() {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [isLoggedIn,setisLoggedIn] = useState(false)
    const [name,setName] = useState('');
    
    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:8000/auth', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, email }),
          });
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
        // Redirect to main after authenticate the logging in
            setisLoggedIn(true)

        // decode user data from accesstoken in localstorage => getting user full name
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
              const decodedToken = jwt_decode(accessToken);
              setName(decodedToken.name);
            }

            console.log('Login successful');
          } else {
            console.log('Login failed');
          }
        } catch (error) {
          console.error('Error occurred during login:', error);
        }
      };


    return (
        <div>
            <br/><br/>
            <TextField onChange={(e)=>setUsername(e.target.value)} label="Username" variant="outlined" />
            <br/><br/>
            <TextField onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" />
            <br/><br/>
            <Button onClick={handleLogin} variant="contained" color="success">Login</Button>


            {isLoggedIn && (
          <Navigate to="/main" state={{ name }}/>
        )}
        </div>
        )
}

export default Login
