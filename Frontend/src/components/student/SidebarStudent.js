import React from 'react';

const Sidebar = ({handleDashboard}) => {
    return (<div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: 280 }}
    >
        <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <button onClick={()=>handleDashboard("STUDENT-HOME")} className="nav-link text-white">
                        Home
                    </button>
                </li>
                
                <li>
                <button onClick={()=>handleDashboard("MENU")} className="nav-link text-white">
                        Menu
                    </button>
                </li>
                <li>
                <button onClick={()=>handleDashboard("TIMING")} className="nav-link text-white">
                        Mess Timming
                    </button>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        Polls
                    </a>
                </li>
                <li className="nav-item">
                    <button onClick={()=>handleDashboard("Setting")} className="nav-link text-white">
                        Edit Your Profile
                    </button>
                </li>
                
            </ul>
        <hr/>
    </div>
    );
}

export default Sidebar;