import UserType from '../types/UserType';
import React, { createContext, useState, useEffect } from 'react';

type UserContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: UserType | null;
    setUser: (user: UserType) => void;
    login: (user: UserType) => void;
    logout: () => void;
    justSignedUp: boolean;
    setJustSignedUp: (value: boolean) => void;
    showLoginWindow: boolean;
    setShowLoginWindow: (value: boolean) => void;

};

const initialUserContext: UserContextType = {
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    user: null,
    setUser: () => { },
    login: () => { },
    logout: () => { },
    justSignedUp: false,
    setJustSignedUp: () => { },
    showLoginWindow: false,
    setShowLoginWindow: () => { },
};

export const UserContext = createContext<UserContextType>(initialUserContext);

type Props = {
    children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
    // Get values from localStorage and parse them to the correct types
    const initialIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;



    // Use these values as the initial state for useState
    const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
    const [user, setUser] = useState<UserType | null>(initialUser);
    const [justSignedUp, setJustSignedUp] = useState(false)
    const [showLoginWindow, setShowLoginWindow] = useState(true);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated.toString());
        localStorage.setItem('user', JSON.stringify(user));
    }, [isAuthenticated, user]);

    const login = (user: UserType) => {
        setIsAuthenticated(true);
        setUser(user);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        console.log('logged out')
    };

    const setIsAuthenticatedWrapper = (value: boolean) => {
        setIsAuthenticated(value);
    };
    const setUserWrapper = (user: UserType) => {
        setUser(user);
    };
    const setJustSignedUpWrapper = (value: boolean) => {
        setJustSignedUp(value);
    };
    const setShowLoginWindowWrapper = (value: boolean) => {
        setShowLoginWindow(value);
    };

    return (
        <UserContext.Provider value={{
            setIsAuthenticated: setIsAuthenticatedWrapper,
            isAuthenticated,
            user,
            setUser: setUserWrapper,
            login,
            logout,
            justSignedUp,
            setJustSignedUp: setJustSignedUpWrapper,
            showLoginWindow,
            setShowLoginWindow: setShowLoginWindowWrapper
        }}>
            {children}
        </UserContext.Provider>
    );
};
