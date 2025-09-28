import React from 'react';

const ScoreBoard = ({ currentScore, bestScore, gameStatus }) => {
  return (
    <div className="scoreboard">
      {gameStatus === 'playing' && (
        <div className="game-status">
          <p>Get points by clicking on a giph but don't click on any more than once!</p>
        </div>
      )}
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
    </div>
  );
};

export default ScoreBoard;