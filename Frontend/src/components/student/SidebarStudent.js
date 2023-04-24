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
                    <a href="#" className="nav-link text-white">
                        Food Menu
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        Polls
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        Settings
                    </a>
                </li>
            </ul>
        <hr/>
    </div>
    );
}

export default Sidebar;