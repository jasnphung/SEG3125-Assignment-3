interface CardProps {
  card: {
    id: number;
    image: string;
    flipped: boolean;
    matched: boolean;
  };
  onClick: () => void;
}

export default function Card({ card, onClick }: CardProps) {
  return (
    <div
      className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        fontSize: '3rem',
        height: '100px',
        width: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #333',
        borderRadius: '10px',
        backgroundColor: card.matched ? '#d3d3d3' : '#fff',
        userSelect: 'none',
      }}
    >
      {(card.flipped || card.matched) ? card.image : '?'}
    </div>
  );
}