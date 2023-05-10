import React, { createContext, useState, useEffect } from 'react';
import { getDecks } from '../services/deckAPI';
import DeckType from '../types/DeckType';

type DeckContextType = {
    deckName: string;
    setDeckName: (value: string) => void;
    decks: DeckType[];
    setDecks: (decks: DeckType[]) => void;
    reloadDecks: () => Promise<void>;
};

const initialDeckContext: DeckContextType = {
    deckName: '',
    setDeckName: () => { },
    decks: [],
    setDecks: () => { },
    reloadDecks: async () => { },
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


    const [decks, setDecks] = useState<DeckType[]>([]); // Add state for the decks array

    // The reloadDecks function that fetches decks using the getDecks function
    const reloadDecks = async () => {
        try {
            const fetchedDecks = await getDecks();
            setDecks(fetchedDecks);
        } catch (error) {
            console.error("Failed to reload decks:", error);
        }
    };


    useEffect(() => {
        reloadDecks();
    }, []);

    return (
        <DeckContext.Provider value={{
            deckName,
            setDeckName: setDeckNameWrapper,
            decks,
            setDecks,
            reloadDecks,
        }}>
            {children}
        </DeckContext.Provider>
    );
};
