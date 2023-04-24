
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import adminService from "../../../services/adminService";


const EditStudent = () => {
    let navigate = useNavigate();

    const { id } = useParams();
    const users = {
        username: "",
        password: "",
        userType: ""
    }

   

    const [student, setStudent] = useState({
        name: "",
        mobile: "",
        
        gender:"",
        
        dayOfBirth:"",
        
        users: users
    });

    const {
        name,
        mobile,
        
        gender,
        
        dayOfBirth,
        
        users: {
            username,
            password,
            userType
        }

    } = student;

    const onInputChange = (e) => {
        console.log(e.target.name );
        console.log(e.target.value);

        if(e.target.name === "username" || e.target.name === "password" || e.target.name === "userType") {
            setStudent({...student, users : {
                    ...student.users,
                    [e.target.name]: e.target.value
                }})
        }

        else if(e.target.name === "line" || e.target.name === "district" || e.target.name === "pincode" || e.target.name === "state") {

            setStudent({...student, address : {
                    ...student.address,
                    [e.target.name]: e.target.value
                }})
        }

        else {
            setStudent({...student, [e.target.name]: e.target.value});
        }
        console.log(student);
    };
    useEffect(() => {
        loadUser();
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();
        // await axios.put("http://localhost:9191/api/admin/updateStudent", student);
        await adminService.updateStudent(student);
        navigate("/");
    };

    const loadUser = async () => {
        // const result = await axios.get(`http://localhost:9191/api/admin/getStudent/${id}`);
        const result= await adminService.getStudent(id);
        setStudent(result.data);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit student details</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Contact
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter number"
                                name="mobile"
                                value={mobile}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Gender
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                day-Of-Birth
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter dayOfBirth"
                                name="dayOfBirth"
                                value={dayOfBirth}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                UserName
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter UserName"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                UserType
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter UserType"
                                name="userType"
                                value={userType}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <center><button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                            <Link className="btn btn-outline-danger mx-2" to="/admin">
                                Cancel
                            </Link>
                        </center>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default EditStudent;