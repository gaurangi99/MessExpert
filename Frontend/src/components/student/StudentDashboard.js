import React, {useState} from 'react';

import StudentHome from "./StudentHome";

import {Button, Col} from "reactstrap"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import Sidebar from "./SidebarStudent";
function StudentDashboard({user}) {
    

    const [studentState,setStudentState] = useState({
        studentHome: true,
        // student: false,
        
    })
    const handleDashboard = (action)=> {
        console.log(action)
        switch(action) {

            case "STUDENT-HOME":
                setStudentState({
                    studentHome: true,
                    student: false,
        
                })
                break;

            // case "Student":
            //     setStudentState({
            //         studentHome: false,
            //         student: true,
        
            //     })
            //     break;

            
        }
    }
    return (
        <div className="row">
            <Sidebar handleDashboard={handleDashboard}/>
            <div className="col" style={{height: '100vh'}}>
                <div className="b-example-divider"></div>
                <div className="row">
                    <div className="col-md-9">
                        <div style={ {height: 1000}}>
                            
                            {studentState.studentHome && <StudentHome/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard