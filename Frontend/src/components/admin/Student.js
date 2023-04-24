import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import adminService from "../../services/adminService";

const Student = () => {


    const [students, setStudents] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const result = await adminService.getallstudent()
        // const result = await axios.get("http://localhost:9191/api/admin/getAllStudents");
        setStudents(result.data);
        console.log(result.data);
    };
    const deleteStudent = async (id) => {
        // await axios.delete(`http://localhost:9191/api/admin/deleteStudent/${id}`);
        await adminService.deletestudent(id);
        loadStudents();
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
                    {students.map((student, index) => (
                        <tr  key={index} >
                            <th scope="row">
                                {index+1}
                            </th>
                            <td>{student.name}</td>
                            <td>{student.users && student.users.username}</td>
                            <td>{student.mobile}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewstudent/${student.healthIdNumber}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-warning mx-2"
                                    to={`/editstudent/${student.healthIdNumber}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={()=> {
                                        if(window.confirm(`Are you sure you want to remove ${student.name} ?` ))
                                        {
                                            deleteStudent(student.id)
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
                            <Link className="btn btn-outline-primary" to="/addstudent">
                                Add student
                            </Link>
                        </td>
                    </tr>
                    </tfoot>

                </table>

            </div>
        </div>
    );
};

export default Student;