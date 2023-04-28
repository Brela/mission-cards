import React, { useContext, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import ErrorContext from '../../contexts/ErrorContext';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import '../../styles/popups/muiPopups.css';


function ErrorAlert() {
    const { error, clearError } = useContext(ErrorContext);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (error) {
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
                clearError();
            }, 5000);
        }
    }, [error, clearError]);

    return (
        <>

            <div className='error-message'>
                <Grow
                    in={showErrorMessage}
                    style={{ transformOrigin: '100 1000 0' }}
                    {...(showErrorMessage ? { timeout: 1000 } : {})}
                >
                    <Alert severity="info" color="info" variant="filled">
                        {error}
                    </Alert>
                </Grow>
            </div>

        </>
    );
}

export default ErrorAlert;
