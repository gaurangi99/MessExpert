import React, {useState} from 'react';

import StudentHome from "./StudentHome";
import Setting from './SettingStudent';

import {Button, Col} from "reactstrap"

import Sidebar from "./SidebarStudent";
function StudentDashboard({user}) {
    
    const falseState={
        studentHome:false,
        setting:false
    }
    
    const [studentState,setStudentState] = useState({
        studentHome: true,
        setting:false
        
    })
    const handleDashboard = (action)=> {
        console.log(action)
        // eslint-disable-next-line default-case
        switch(action) {

            case "STUDENT-HOME":
                setStudentState({
                    studentHome: true,
                    student: false,
        
                })
                break;
            case "Setting":
                setStudentState({
                    ...falseState,
                    setting:true
                })
                break;
            
            
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
                            {
                                studentState.setting && <Setting user={user}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard