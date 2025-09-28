import React from 'react';
import Card from './Card.jsx';

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="game-board">
      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            cardData={card}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;