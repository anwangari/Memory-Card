import React, { useState, useEffect } from 'react';
import ScoreBoard from './components/ScoreBoard.jsx';
import GameBoard from './components/GameBoard.jsx';
import './styles/App.css';

const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  // Animal names to search for
  const animalNames = [
    'bear', 'fox', 'bird', 'dog', 'cat', 'wolf', 
    'rabbit', 'panda', 'tiger', 'lion', 'elephant', 'penguin'
  ];

  // Fetch animal GIFs from Giphy API
  const fetchAnimalGifs = async () => {
    setIsLoading(true);
    const apiKey = '5POCsw5fBOfWaOpS3IFNumTHTwVqHsSy';
    const fetchedCards = [];

    try {
      for (let i = 0; i < animalNames.length; i++) {
        const animal = animalNames[i];
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${animal} cute&limit=1&rating=g`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            fetchedCards.push({
              id: i,
              name: animal.charAt(0).toUpperCase() + animal.slice(1),
              imageUrl: data.data[0].images.fixed_height.url,
              alt: `${animal} animation`
            });
          }
        }
      }
      
      setCards(shuffleCards(fetchedCards));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
      setIsLoading(false);
      // Fallback to placeholder data if API fails
      createFallbackCards();
    }
  };

  // Create fallback cards if API fails
  const createFallbackCards = () => {
    const fallbackCards = animalNames.map((animal, index) => ({
      id: index,
      name: animal.charAt(0).toUpperCase() + animal.slice(1),
      imageUrl: `https://via.placeholder.com/200x200?text=${animal}`,
      alt: `${animal} placeholder`
    }));
    setCards(shuffleCards(fallbackCards));
  };

  // Shuffle cards array
  const shuffleCards = (cardsArray) => {
    const shuffled = [...cardsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle card click
  const handleCardClick = (cardId) => {
    if (gameStatus !== 'playing') return;

    // Check if card was already clicked
    if (clickedCards.includes(cardId)) {
      // Game over - reset game
      setGameStatus('lost');
      resetGame();
      return;
    }

    // Add card to clicked cards
    const newClickedCards = [...clickedCards, cardId];
    setClickedCards(newClickedCards);
    
    // Increase score
    const newScore = currentScore + 1;
    setCurrentScore(newScore);

    // Update best score if needed
    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    // Check if won (clicked all cards)
    if (newClickedCards.length === cards.length) {
      setGameStatus('won');
      setTimeout(() => {
        alert('Congratulations! You won!');
        resetGame();
      }, 500);
      return;
    }

    // Shuffle cards for next round
    setCards(shuffleCards(cards));
  };

  // Reset game
  const resetGame = () => {
    setCurrentScore(0);
    setClickedCards([]);
    setGameStatus('playing');
    setCards(shuffleCards(cards));
  };

  // Fetch GIFs when component mounts
  useEffect(() => {
    fetchAnimalGifs();
  }, []);

  if (isLoading) {
    return (
      <div className="app loading">
        <div className="loading-message">
          <h2>Loading Animal Memory Game...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">ANIMO MEMORY GAME</h1>
        <ScoreBoard 
          currentScore={currentScore}
          bestScore={bestScore}
          gameStatus={gameStatus}
        />
        <GameBoard 
          cards={cards}
          onCardClick={handleCardClick}
        />
        <div className="game-instructions">
          <p>&copy; 2025 IronHub Technologies. All rights reserved.</p>
        </div>
        {gameStatus === 'lost' && (
          <div className="game-message">
            <p>Game Over! You clicked the same card twice.</p>
            <button onClick={resetGame} className="restart-btn">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;