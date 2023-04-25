import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import UserType from '../types/UserType';

function Footer() {
    const { isAuthenticated, user, logout } = useContext(UserContext);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowLogoutMessage(true);
            setTimeout(() => {
                setShowLogoutMessage(false);
            }, 10000);
        }
    }, [isAuthenticated]);

    return (
        <footer className='footer'>
            <div className="quote">
                <input placeholder="enter your mission here" />
            </div>
            <div className="login">
                {isAuthenticated ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Link to='/auth'>
                        <button>Login</button>
                    </Link>
                )}
                <div className='logout-message'>
                    <Grow
                        in={showLogoutMessage}
                        style={{ transformOrigin: '100 1000 0' }}
                        {...(showLogoutMessage ? { timeout: 1000 } : {})}
                    >
                        <Alert severity="success" color="success" variant="filled">
                            {user ? (
                                `${user.email} has logged out successfully.`
                            ) : (
                                'You have logged out successfully.'
                            )}
                        </Alert>
                    </Grow>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
