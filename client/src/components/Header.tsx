import React from 'react';

function Header() {
    return (
        <header className='header'>
            <div className="mission">
                <h2>Mission: </h2>
                <input placeholder="study cards" />
            </div>
            <div className="current">
                <h3>Current # 140</h3>
            </div>
        </header>
    );
}

export default Header;