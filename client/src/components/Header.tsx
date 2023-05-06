import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPalette, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <header className='header'>

            <div className="mission">
                <Link to='/'>
                    <h2><FontAwesomeIcon icon={faLayerGroup} />mission</h2>
                </Link >
            </div>
            {/*   <div className="quote">
                <input placeholder="enter your mission here" />
            </div> */}
        </header>
    );
}

export default Header;