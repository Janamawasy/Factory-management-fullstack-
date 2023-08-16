import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsersComp from './Pages/Users/UsersComp';
import ShiftsComp from './Pages/Shifts/ShiftsComp';
import EmployeesComp from './Pages/Emp/EmployeesComp';
import DepartmentsComp from './Pages/Dep/DepartmentsComp';
import AddEmployeeComp from './Pages/Emp/AddEmployeeComp';
import EditEmployeeComp from './Pages/Emp/EditEmployeeComp';
import AddDepComp from './Pages/Dep/AddDepComp';
import EditDepComp from './Pages/Dep/EditDepComp';


function App() {

  fetch('http://localhost:8000/usersDB', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.logoutRequired) {
        // Perform the logout action here (e.g., clear session, local storage, etc.)
        // Redirect the user to the login page or show a message indicating logout
        <Navigate to="/"/>
        // window.location.href = '/login'; // Redirect to the login page
      } else {
        // Handle the response data for the action
      }
    })
    .catch((error) => {
      console.log('error :::',error)  
    });
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/main' element={<MainPage />}>
                <Route path='UsersPage' element={<UsersComp />} />
                <Route path='ShiftsPage' element={<ShiftsComp />} />
                <Route path='DepartmentsPage' element={<DepartmentsComp />} />
                <Route path='EmployeesPage' element={<EmployeesComp />} />
                <Route path='new-employee-page' element={<AddEmployeeComp />} />
                <Route path='edit-employee-page' element={<EditEmployeeComp />} />
                <Route path='new-department-page' element={<AddDepComp />} />
                <Route path='edit-department-page' element={<EditDepComp />} />

                {/* </Route> */}
          </Route>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
