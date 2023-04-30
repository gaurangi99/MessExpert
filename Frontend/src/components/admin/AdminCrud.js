import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import adminService from "../../services/adminService";

const Admin = () => {


    const [admins, setAdmins] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadAdmins();
    }, []);

    const loadAdmins = async () => {
        // const result = await adminService.getalluser()
        const result = await adminService.getUserByRole("ADMIN")
        // const result = await axios.get("http://localhost:9191/api/admin/getAllAdmins");
        setAdmins(result.data);
        console.log(result.data);
    };
    const deleteAdmin = async (id) => {
        // await axios.delete(`http://localhost:9191/api/admin/deleteAdmin/${id}`);
        await adminService.deleteuser(id);
        loadAdmins();
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">mobile</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {admins.map((admin, index) => (
                        <tr  key={index} >
                            <th scope="row">
                                {index+1}
                            </th>
                            <td>{admin.name}</td>
                            <td>{admin.username}</td>
                            <td>{admin.mobile}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewadmin/${admin.id}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-warning mx-2"
                                    to={`/editadmin/${admin.id}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={()=> {
                                        if(window.confirm(`Are you sure you want to remove ${admin.name} ?` ))
                                        {
                                            deleteAdmin(admin.id)
                                        };
                                    }}
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <Link className="btn btn-outline-primary" to="/addadmin">
                                Add admin
                            </Link>
                        </td>
                    </tr>
                    </tfoot>

                </table>

            </div>
        </div>
    );
};

export default Admin;