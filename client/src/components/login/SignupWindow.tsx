import React, { useState, useEffect, useContext } from 'react';
import { createUserWithEmail } from '../../services/userAPI';
// import { createUserWithGoogle } from '../../services/authAPI';
import { UserContext } from '../../contexts/UserContext';

type Props = {
    onUserLoggedIn: (user: any) => void;
};
declare global {
    interface Window {
        google: any;
        gapi: any;
    }
}

function SignupWindow() {
    const { setJustSignedUp, setShowLoginWindow } = useContext(UserContext);
    // const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSignupUserWithEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password === confirmPassword) {
            const response = await createUserWithEmail(email, password, confirmPassword);
            if (response.user) {
                setJustSignedUp(true)
                setShowLoginWindow(true)
            }
            console.log(response);
        } else {
            console.log("Passwords do not match.");
        }
    }

    /* 
   async function handleCreateUserWithGoogle(idToken: string) {
       const response = await createUserWithGoogle(idToken);
       if (response.status === 200) {
           setJustSignedUp(true)
           setShowLoginWindow(true)
       } else {
           alert(response.data.error);
       }
   }

   // ---------------------- google button with popup window -------------------------------------------------------------
      useEffect(() => {
           window.gapi.load('auth2', renderGoogleButton);
       }, []) 

   function renderGoogleButton() {
       window.gapi.signin2.render('google-button', {
           scope: 'profile email',
           // width: 184,
           // height: 100,
           longtitle: true,
           theme: 'none',
           onsuccess: onGoogleSignInSuccess,
           onfailure: onGoogleSignInFailure,
       });
   }

   function onGoogleSignInSuccess(googleUser: any) {
       const idToken = googleUser.getAuthResponse().id_token;
       handleCreateUserWithGoogle(idToken);
   }

   function onGoogleSignInFailure(error: any) {
       console.error("Google Sign-In error:", error);
   } */

    // -----------------------------------------------------------------------------------

    useEffect(() => {
    }, []);

    return (
        <div className="">
            <form onSubmit={handleSignupUserWithEmail}>
                <ul>
                    <li className='email-pass'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </li>
                    {/*       <li>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="username"
                            id="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </li> */}
                    <li className='email-pass'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li className='email-pass pass'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li className="sign-up-button google-btn">
                        <button type="submit" className="btn-text sign-in-with-email">Sign up with email</button>
                    </li>

                    {/*  google sign up buton  
                          <li className='or-container'>
                        <span></span>
                        <p className='or'>or</p>
                        <span></span>
                    </li> 
                    
                    <li className='google-button-container'>
                        <div id="google-button"></div>
                    </li> */}


                    {/*            
             previous google button from scratch but no options or popup window to choose account
             --------------------------------------------------------------
             <button className="google-btn" onClick={signUpWithGoogle}>
                            <div className="google-icon-wrapper">
                                <img className="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                            </div>
                            <p className="btn-text"><b>Sign up with Google</b></p>
                        </button> */}

                </ul>

            </form>
        </div>
    );
}

export default SignupWindow;
