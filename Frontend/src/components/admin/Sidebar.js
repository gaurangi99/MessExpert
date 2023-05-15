import React from 'react';

const Sidebar = ({handleDashboard}) => {
    return (<div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: 280 }}
    >
        <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <button onClick={()=>handleDashboard("ADMIN-HOME")} className="nav-link text-white">
                        Home
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("Student")} className="nav-link text-white">
                        Student
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("Admin")} className="nav-link text-white">
                        Admin
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("Menu")} className="nav-link text-white">
                        Menu
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("Special-Menu")} className="nav-link text-white">
                        Special-Menu
                    </button>
                </li>
                <li>
                    <button onClick={()=>handleDashboard("CreatePoll")} className="nav-link text-white">
                        Create New Poll
                    </button>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        Polls
                    </a>
                </li>
                
                <li>
                    <button onClick={()=>handleDashboard("Setting")} className="nav-link text-white">
                        Edit your Profile
                    </button>
                </li>
                
                
            </ul>
        <hr/>
    </div>
    );
}

export default Sidebar;