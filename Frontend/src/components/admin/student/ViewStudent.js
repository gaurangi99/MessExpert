import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

import adminService from "../../../services/adminService";



const ViewStudent = () => {

    const [student, setStudent] = useState({

    });

    const { id } = useParams();

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        const result = await adminService.getStudent(id)
        console.log(result);
        setStudent(result.data);
        console.log(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Student Details</h2>

                    <div className="card">
                        <div className="card-header">
                            <center> <b>Details of : </b>{student.name}</center>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Gender:</b>
                                    {student.gender}
                                </li>
                               
                                <li className="list-group-item">
                                    <b>DOB:</b>
                                    <p>{student.dayOfBirth}</p>
                                </li>
                                
                                
                            </ul>
                        </div>
                        <Link className="btn btn-primary my-2" to={"/admin"}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStudent;