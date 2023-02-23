import { createContext, useContext } from 'react';

type DeckContextType = {
    deckName: string;
    setDeckName: (deckName: string) => void;
};

export const DeckContext = createContext<DeckContextType>({
    deckName: '',
    setDeckName: () => { },
});

export function useDeckContext() {
    return useContext(DeckContext);
}
