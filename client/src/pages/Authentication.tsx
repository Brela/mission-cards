import React, { useState } from 'react';
// import { Outlet, Link } from "react-router-dom";
import '../styles/login/loginPage.css';

import Header from '../components/Header';
import LoginWindow from '../components/login/LoginWindow';
import SignupWindow from '../components/login/SignupWindow';

function Home() {
    const [isLoginActive, setIsLoginActive] = useState(false);

    const handleToggle = () => {
        setIsLoginActive(!isLoginActive);
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
                    {isLoginActive ? <LoginWindow /> : <SignupWindow />}
                    <div>
                        <button className='go-to-button' onClick={handleToggle}>
                            {isLoginActive ? 'Go to Signup Page' : 'Go to Login Page'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
