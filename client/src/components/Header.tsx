import React from 'react';

function Header() {
    return (
        <header className='header'>
            <div className="mission">
                <h2><i className="fa-solid fa-layer-group"></i>mission</h2>
            </div>
            <div className="current">
                <h3>Current # 140</h3>
            </div>
        </header>
    );
}

export default Header;