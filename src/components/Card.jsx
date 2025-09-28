import React from 'react';

const Card = ({ cardData, onClick }) => {
  const handleClick = () => {
    onClick(cardData.id);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-image-container">
        <img 
          src={cardData.imageUrl} 
          alt={cardData.alt}
          className="card-image"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = `https://via.placeholder.com/200x200?text=${cardData.name}`;
          }}
        />
      </div>
      <div className="card-info">
        <span className="card-name">{cardData.name}</span>
      </div>
    </div>
  );
};

export default Card;