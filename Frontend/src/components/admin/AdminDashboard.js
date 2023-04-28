/* eslint-disable default-case */
import React, {useState} from 'react';
import Student from "./Student";
import AdminHome from "./AdminHome";
import Menu from "./Menu"
import AdminCrud from "./AdminCrud"
import SpecialMenu from "./SpecialMenu.js"
import Setting from './SettingAdmin';

import {Button, Col} from "reactstrap"

import Sidebar from "./Sidebar";

function AdminDashboard({user}) {

console.log(user);
    const falseState = {
        adminHome: false,
        student: false,
        admin:false,
        menu:false,
        specialMenu:false,
        setting:false

    }  
    

    const [adminState,setAdminState] = useState({
        adminHome: true,
        student: false,
        admin:false,
        menu:false,
        specialMenu:false,
        setting:false
        
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

            case "Admin":
                setAdminState({
                    ...falseState,
                    admin: true,
                })
            break;
            
            case "Menu":  
            setAdminState({
                ...falseState,
                menu:true
    
            })  
            break;

            case "Special-Menu":
                setAdminState({
                    ...falseState,
                    specialMenu:true,
                })
                break;
            
            case "Setting":
                setAdminState({
                    ...falseState,
                    setting:true,
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
                        <div style={ {height:1000}}>
                            {adminState.student && <Student/>}
                            {adminState.adminHome && <AdminHome/>}
                            {adminState.specialMenu && <SpecialMenu/>}
                            {adminState.admin && <AdminCrud/>}
                            {adminState.menu && <Menu/>}
                            {adminState.setting&&<Setting user={user}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard