import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from "./components/Login";
import { useState, useEffect } from 'react';
import authService from './services/authService';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashBoard from './components/student/StudentDashboard';
import UnexpectedError from './components/UnexpectedError';
import BasicNavbar from "./components/BasicNavbar";
import AddStudent from "./components/admin/student/AddStudent";
import EditStudent from "./components/admin/student/EditStudent";
import ViewStudent from "./components/admin/student/ViewStudent";
import AddAdmin from "./components/admin/admin/AddAdmin";
import EditAdmin from "./components/admin/admin/EditAdmin";
import ViewAdmin from "./components/admin/admin/ViewAdmin";
import Footer from './components/Footer';



const App = () => {
    const navigate  = useNavigate();
    const [user, setuser] = useState(null);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log('effect',userData)
        setuser(userData)
    }, [])

    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(event);
        const username = event.target[0].value;
        const password = event.target[1].value;
        const stayLoggedIn = event.target[2].checked;

        authService.login(username, password).then((responseData) => {
            if(responseData) {
                console.log(responseData.token)
                setErrorMessage(null)
                window.localStorage.setItem("token", responseData.token)
                setuser({
                    username: username,
                    userType: responseData.role
                })
                if (stayLoggedIn) {
                    window.localStorage.setItem("user", JSON.stringify({
                        username: username,
                        userType: responseData.role
                    }))
                }
            }
            else {
                setErrorMessage("Invalid Credentials")
            }
        },
        (error)=>{
            if(error.code === 'ERR_NETWORK')
                setErrorMessage("Server Unreachable")
            else
                setErrorMessage("Invalid Credentials")
        });
        console.log("asdf");
    }
    const handleLogout = (event)=> {
        event.preventDefault()
        window.localStorage.removeItem("user")
        setuser(null)
        navigate("/")
    }
    return  (
        <div>
        <div>
            <BasicNavbar user={user} handleLogout={handleLogout}/>
            {
                <Routes>
                    <Route path="/error" element={ <UnexpectedError/>}/>
                    <Route path="/student" element={user?<StudentDashBoard user={user}/>:<Navigate replace to="/"/>}/>
                    <Route path="/admin" element={ user?<AdminDashboard user = {user}/> : <Navigate replace to="/" />}/>
                    <Route path="/" element={user ? (user.userType ==="STUDENT"? <Navigate replace to="/student" /> :
                (user.userType === "ADMIN"? <Navigate replace to="/admin" /> : <Navigate replace to = "/"/>))
                        : <Login handleLogin={handleLogin} errorMessage= {errorMessage} />} />
                    <Route path="/addstudent" element={<AddStudent/>} />
                    <Route path="/editstudent/:id" element={<EditStudent/>}/>
                    <Route path="/viewstudent/:id" element={<ViewStudent/>}/>
                    <Route path="/addadmin" element={<AddAdmin/>}/>
                    <Route path="/editadmin/:id" element={<EditAdmin/>}/>
                    <Route path="/viewadmin/:id" element={<ViewAdmin/>}/>
                </Routes>

            }
            </div>
            <div>
            <Footer/>
            </div>
            
        </div>
    )
};

export default App;
