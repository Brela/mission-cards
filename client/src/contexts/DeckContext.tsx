import React, { createContext, useState, useEffect } from 'react';

type DeckContextType = {
    deckName: string;
    setDeckName: (value: string) => void;
};

const initialDeckContext: DeckContextType = {
    deckName: '',
    setDeckName: () => { },
};

export const DeckContext = createContext<DeckContextType>(initialDeckContext);

type Props = {
    children: React.ReactNode;
};

export const DeckProvider: React.FC<Props> = ({ children }) => {
    // Get the value from localStorage
    const initialDeckName = localStorage.getItem('deckName') || '';

    // Use this value as the initial state for useState
    const [deckName, setDeckName] = useState(initialDeckName);

    useEffect(() => {
        localStorage.setItem('deckName', deckName);
    }, [deckName]);

    const setDeckNameWrapper = (value: string) => {
        setDeckName(value);
    };

    return (
        <DeckContext.Provider value={{
            deckName,
            setDeckName: setDeckNameWrapper
        }}>
            {children}
        </DeckContext.Provider>
    );
};
