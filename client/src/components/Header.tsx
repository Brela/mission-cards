import React from 'react';
import { Outlet, Link } from "react-router-dom";

function Header() {
    return (
        <header className='header'>

            <div className="mission">
                <Link to='/'>
                    <h2><i className="fa-solid fa-layer-group"></i>mission</h2>
                </Link >
            </div>
            {/*   <div className="quote">
                <input placeholder="enter your mission here" />
            </div> */}
        </header>
    );
}

export default Header;