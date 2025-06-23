import React from 'react';
import Card from './Card';
import { CardType } from '../types';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  columns: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, columns }) => {
  const gridColumns = Math.max(columns, 4);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '10px',
        width: 'fit-content',
        margin: '0 auto',
        justifyContent: 'center',
      }}
    >
      {cards.map((card) => (
        <div key={card.id}>
          <Card card={card} onClick={() => onCardClick(card)} />
        </div>
      ))}
    </div>
  );
};

export default GameBoard;