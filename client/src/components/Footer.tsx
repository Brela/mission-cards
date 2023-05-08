import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import UserType from '../types/UserType';

function Footer() {
    const { isAuthenticated, user, logout } = useContext(UserContext);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const [prevIsAuthenticated, setPrevIsAuthenticated] = useState(isAuthenticated);

    const [showSignUpMessage, setShowSignUpMessage] = useState(false);

    // this is used to show the "logout successful message" if they were logged in then logged out
    useEffect(() => {
        if (prevIsAuthenticated && !isAuthenticated) {
            setShowLogoutMessage(true);
            setTimeout(() => {
                setShowLogoutMessage(false);
            }, 10000);
        }
    }, [isAuthenticated]);

    /* // if they are signed in as guest or not signed in, this message will appear until they close it
    useEffect(() => {
        if (!user) {
            setShowSignUpMessage(true);
            setTimeout(() => {
                setShowLogoutMessage(false);
            }, 10000);
        }
    }, [isAuthenticated, user]);

    const handleCloseSignUpMessage = () => {
        setShowSignUpMessage(false);
    };
 */
    return (
        <footer className='footer'>

            {/* this message is only for if they aren't signed in */}
            {/*   <div className="login-to-use-features-message">
                {!isAuthenticated && showSignUpMessage && (
                    <Alert
                        severity="info"
                        className="custom-alert"
                        action={
                            <span
                                className="custom-alert-close"
                                onClick={() => setShowSignUpMessage(false)}
                            >
                                &times;
                            </span>
                        }
                    >
                        Please sign up for full access to features
                    </Alert>
                )}

            </div> */}
            {/* end message */}
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