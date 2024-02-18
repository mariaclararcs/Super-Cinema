import { createContext, ReactNode, useContext, useState } from 'react';

interface MovieStateContextProps {
    isLoading: boolean;
    isImgLoading: boolean;
    showPlayer: boolean;
    trailer: string;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsImgLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
    setTrailer: React.Dispatch<React.SetStateAction<string>>;
}

const MovieStateContext = createContext<MovieStateContextProps | undefined>(undefined);

    export const MovieStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [trailer, setTrailer] = useState('');

    return (
        <MovieStateContext.Provider
            value={{
                isLoading,
                isImgLoading,
                showPlayer,
                trailer,
                setIsLoading,
                setIsImgLoading,
                setShowPlayer,
                setTrailer,
            }}
        >
            {children}
        </MovieStateContext.Provider>
    );
};

export const useMovieState = () => {
    const context = useContext(MovieStateContext);

    if(!context) 
        throw new Error('useMovieState must be used within a MovieStateProvider');

    return context;
};
