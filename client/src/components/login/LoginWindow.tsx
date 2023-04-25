import React, { useState, useEffect, useContext } from 'react';
import { loginUser } from '../../services/authAPI';
import { UserContext } from '../../contexts/UserContext';

type Props = {
};

function LoginWindow() {
    const { isAuthenticated, setIsAuthenticated, user, setUser, logout } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        console.log("isAuthenticated ", isAuthenticated)
        console.log("user ", user)
    }, [isAuthenticated, user]);


    async function handleLoginUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await loginUser(email, password);
        // console.log(response);
        if (response.status === 200) {
            // Redirect to home page after successful login
            setIsAuthenticated(true)
            console.log("response", response)
            setUser(response.data.user)
            window.location.href = '/';
        } else {
            // Display error message if login fails
            alert(response.data.error);
        }
    }


    return (
        <div className="">
            <form onSubmit={handleLoginUser}>
                <ul>
                    <li>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li className='sign-up-button'>
                        <button type="submit">Log in</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default LoginWindow;
