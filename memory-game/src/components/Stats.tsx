import React from 'react';

interface StatsProps {
  moves: number;
  time: number;
}

const Stats: React.FC<StatsProps> = ({ moves, time }) => {
  return (
    <div className="text-center my-3">
      <p>Moves: {moves}</p>
      <p>Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</p>
    </div>
  );
};

export default Stats;