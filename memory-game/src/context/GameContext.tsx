'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextProps {
    level: 'easy' | 'medium' | 'hard';
    theme: 'animals' | 'fruits';
    setLevel: (level: 'easy' | 'medium' | 'hard') => void;
    setTheme: (theme: 'animals' | 'fruits') => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [theme, setTheme] = useState<'animals' | 'fruits'>('animals');

    return (
        <GameContext.Provider value={{ level, theme, setLevel, setTheme }}>
            {children}
        </GameContext.Provider>
    );
};