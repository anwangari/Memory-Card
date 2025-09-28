import React from 'react';

const ScoreBoard = ({ currentScore, bestScore, gameStatus }) => {
  return (
    <div className="scoreboard">
      <div className="score-container">
        <div className="score-item">
          <span className="score-label">Points:</span>
          <span className="score-value">{currentScore}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Highest Points:</span>
          <span className="score-value">{bestScore}</span>
        </div>
      </div>
      {gameStatus === 'playing' && (
        <div className="game-status">
          <p>Click each animal only once!</p>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;