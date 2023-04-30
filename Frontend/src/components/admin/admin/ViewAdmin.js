import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

import adminService from "../../../services/adminService";



const ViewAdmin = () => {

    const [admin, setAdmin] = useState({

    });

    const { id } = useParams();

    useEffect(() => {
        loadAdmin();
    }, []);

    const loadAdmin = async () => {
        const result = await adminService.getUser(id)
        console.log(result);
        setAdmin(result.data);
        console.log(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Admin Details</h2>

                    <div className="card">
                        <div className="card-header">
                            <center> <b>Details of : </b>{admin.name}</center>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Username:</b>
                                    &ensp;{admin.username}
                                </li>
                                <li className="list-group-item">
                                    <b>EmailId:</b>
                                    &ensp;{admin.email}
                                </li>
                               
                                <li className="list-group-item">
                                    <b>Contact:</b>
                                    &ensp;{admin.mobile}
                                </li>
                                <li className="list-group-item">
                                    <b>FoodChoice:</b>
                                    &ensp;{admin.foodChoice}
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

export default ViewAdmin;