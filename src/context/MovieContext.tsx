"use client"

import IMovies from '@/intefaces/IMovie';
import { createContext, ReactNode, useContext, useState } from 'react';

interface MovieContextProps {
    movie: IMovies | null;
    setMovie: React.Dispatch<React.SetStateAction<IMovies | null>>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [movie, setMovie] = useState<IMovies | null>(null);

    return (
        <MovieContext.Provider value={{ movie, setMovie }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovie = () => {
    const context = useContext(MovieContext);

    if(!context) 
        throw new Error('useMovie must be used within a MovieProvider');

    return context;
};
