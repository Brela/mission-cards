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
            <div className="current">
                <h3>Current # 140</h3>
            </div>
        </header>
    );
}

export default Header;