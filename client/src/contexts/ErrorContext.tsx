// src/contexts/ErrorContext.tsx
import { createContext, useState, useCallback, ReactNode } from 'react';

interface ErrorContextType {
    error: string | null;
    setError: (error: string | null) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => { },
    clearError: () => { },
});

interface ErrorProviderProps {
    children: ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const setErrorWrapper = useCallback((str: string | null) => {
        setError(str);
    }, []);

    return (
        <ErrorContext.Provider value={{ error, setError: setErrorWrapper, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
}

export default ErrorContext;
