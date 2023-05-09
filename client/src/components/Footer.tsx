import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import UserType from '../types/UserType';

function Footer() {
    const { isAuthenticated, user, logout } = useContext(UserContext);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const [prevIsAuthenticated, setPrevIsAuthenticated] = useState(isAuthenticated);

    const [showSignUpMessage, setShowSignUpMessage] = useState(false);

    const location = useLocation();

    // this is used to show the "logout successful message" if they were logged in then logged out
    useEffect(() => {
        if (prevIsAuthenticated && !isAuthenticated) {
            setShowLogoutMessage(true);
            setTimeout(() => {
                setShowLogoutMessage(false);
            }, 10000);
        }
    }, [isAuthenticated]);
    // these are what dynamically change the text and link for the button to send to either addcards or study cards page
    const studyCardsButtonLink = location.pathname === '/studycards' ? '/addcards' : '/studycards';
    const studyCardsButtonText = location.pathname === '/studycards' ? 'Add' : 'Study';

    return (
        <footer className='footer'>

            <div className="login">
                {isAuthenticated ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Link to='/'>
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
            <div className='studycards-button'>
                <Link to={studyCardsButtonLink}>
                    <button>{studyCardsButtonText}<span> Cards</span></button>
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
