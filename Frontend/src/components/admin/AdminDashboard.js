import React, {useState} from 'react';
import Student from "./Student";
import AdminHome from "./AdminHome";
import Menu from "./Menu"

import {Button, Col} from "reactstrap"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import Sidebar from "./Sidebar";
function AdminDashboard({user}) {
    const falseState = {
        adminHome: false,
        student: false,
        menu:false
    }  
    

    const [adminState,setAdminState] = useState({
        adminHome: true,
        student: false,
        menu:false
        
    })
    const handleDashboard = (action)=> {
        console.log(action)
        switch(action) {

            case "ADMIN-HOME":
                setAdminState({
                    ...falseState,
                    adminHome: true,
                    
                })
                break;

            case "Student":
                setAdminState({
                    ...falseState,
                    student: true,
                    
        
                })
                break;

            case "Menu":  
            setAdminState({
                ...falseState,
                menu:true
    
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
                            {adminState.student && <Student/>}
                            {adminState.adminHome && <AdminHome/>}
                            {adminState.menu && <Menu/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard