'use client';

import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import { useGameContext } from '../context/GameContext';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { setLevel, setTheme } = useGameContext();

  const [selectedLevel, setSelectedLevel] = useState<string>('easy');
  const [selectedTheme, setSelectedTheme] = useState<string>('animals');

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setLevel(level as any);
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setTheme(theme as any);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/game');
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4">Quick Match - A Memory Card Game</h1>
        <form onSubmit={handleStart} className="text-center">
          <div className="mb-3">
            <label className="form-label d-block mb-2">Select Level:</label>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-outline-primary btn-lg${selectedLevel === 'easy' ? ' active' : ''}`}
                onClick={() => handleLevelSelect('easy')}
              >
                Easy
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary btn-lg${selectedLevel === 'medium' ? ' active' : ''}`}
                onClick={() => handleLevelSelect('medium')}
              >
                Medium
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary btn-lg${selectedLevel === 'hard' ? ' active' : ''}`}
                onClick={() => handleLevelSelect('hard')}
              >
                Hard
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label d-block mb-2">Select Theme:</label>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-outline-primary btn-lg${selectedTheme === 'animals' ? ' active' : ''}`}
                onClick={() => handleThemeSelect('animals')}
              >
                Animals
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary btn-lg${selectedTheme === 'fruits' ? ' active' : ''}`}
                onClick={() => handleThemeSelect('fruits')}
              >
                Fruits
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Start Game</button>
        </form>
      </div>
    </>
  );
}