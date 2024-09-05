import React, { useState } from "react";
import "./styles/Sidenav.css";

const Sidenav = () => {
    const [sideNavWidth, setSideNavWidth] = useState(0); // To control the width of the sidenav

    const openNav = () => {
        setSideNavWidth(250); // Set the width to 250px when opening
    };

    const closeNav = () => {
        setSideNavWidth(0); // Set the width to 0px when closing
    };

    return (
        <div>
            {/* Sidenav */}
            <div
                id="mySidenav"
                className="sidenav"
                style={{ width: sideNavWidth }} // Dynamically update the width based on state
            >
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
                    &times;
                </a>
                <a href="#" style={{ backgroundColor: "Red" }}>Logout</a>

            </div>

            {/* Main Content */}

            <span style={{ fontSize: "30px", cursor: "pointer" }} onClick={openNav}>
                &#9776; Open Sidenav
            </span>
        </div>
    );
};

export default Sidenav;