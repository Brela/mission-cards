import React, { useState, useContext } from 'react';
// import { Outlet, Link } from "react-router-dom";
import '../styles/login/loginPage.css';
import { UserContext } from '../contexts/UserContext';

import Header from '../components/Header';
import LoginWindow from '../components/login/LoginWindow';
import SignupWindow from '../components/login/SignupWindow';


type Props = {
    onUserLoggedIn: (user: any) => void;
};


function AuthenticationPage() {
    const { showLoginWindow, setShowLoginWindow } = useContext(UserContext);

    const handleToggle = () => {
        setShowLoginWindow(!showLoginWindow);
    };

    return (
        <>

            <div className='auth-page'>
                <div className="mission">
                    {/* <Link to='/'> */}
                    <h2><i className="fa-solid fa-layer-group"></i>mission</h2>
                    {/* </Link > */}
                </div>
                <h1 className='title'>Welcome to Mission Cards!</h1>
                {/* <h3 className='title subtitle'>Take your studying to the next level with your custom mission and ChatGPT as your personal assistant</h3> */}
                <div className="auth-window-container">
                    {showLoginWindow ? <LoginWindow /> : <SignupWindow />}
                    <div>
                        <button className='go-to-button' onClick={handleToggle}>
                            {showLoginWindow ? 'Go to Signup' : 'Go to Login'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthenticationPage;
