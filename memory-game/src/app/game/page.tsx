'use client';

import Navbar from "@/components/Navbar";
import { useEffect, useState } from 'react';
import { useGameContext } from '../../context/GameContext';
import GameBoard from '../../components/GameBoard';
import Stats from '../../components/Stats';
import { generateShuffledCards } from '../../utils/cardUtils';
import { CardType } from '../../types';

export default function GamePage() {
  const { level, theme } = useGameContext();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setCards(generateShuffledCards(level, theme));
    setGameOver(false);
  }, [level, theme]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerStarted && !gameOver) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerStarted, gameOver]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setGameOver(true);
      setTimerStarted(false);
    }
  }, [cards]);

  const handleCardClick = (card: CardType) => {
    if (!timerStarted) setTimerStarted(true);
    if (card.flipped || card.matched || flipped.length === 2) return;

    const updated = cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c));
    const newFlipped = [...flipped, { ...card, flipped: true }];

    setCards(updated);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setTimeout(() => {
        const [a, b] = newFlipped;
        if (a.image === b.image) {
          setCards((prev) => prev.map((c) =>
            c.image === a.image ? { ...c, matched: true } : c
          ));
        } else {
          setCards((prev) => prev.map((c) =>
            c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c
          ));
        }
        setFlipped([]);
      }, 1000);
    }
  };

  const getColumns = () => (level === 'easy' ? 4 : level === 'medium' ? 4 : 6);

  return (
    <>
    <Navbar />
    
    <div className="container py-5">
      <h2 className="text-center mb-3">Level: {level}</h2>
      <h2 className="text-center mb-3">Theme: {theme}</h2>
      <Stats moves={moves} time={time} />
      <GameBoard cards={cards} onCardClick={handleCardClick} columns={getColumns()} />
      {gameOver && (
          <div className="alert alert-success text-center mt-4" role="alert">
            Congratulations! You matched all the cards in {moves} moves and {time} seconds!
          </div>
        )}
    </div>
    </>
  );
}