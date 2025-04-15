import { useState, useEffect } from 'react';

const FlashCard = ({ card, onCardUpdate }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const markAsCorrect = () => {
    setIsCorrect(true);
    onCardUpdate({ ...card, reviewed: true, correct: true });
  };

  const markAsIncorrect = () => {
    setIsCorrect(false);
    onCardUpdate({ ...card, reviewed: true, correct: false });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        flipCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFlipped]);

  const cardStyles = {
    container: {
      width: '300px',
      height: '200px',
      perspective: '1000px',
      margin: '20px auto',
    },
    card: {
      width: '100%',
      height: '100%',
      position: 'relative',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s',
      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      cursor: 'pointer',
    },
    face: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      padding: '20px',
      boxSizing: 'border-box',
    },
    front: {
      backgroundColor: '#f8f9fa',
      color: '#212529',
      border: '1px solid #dee2e6',
    },
    back: {
      backgroundColor: '#e9ecef',
      color: '#212529',
      transform: 'rotateY(180deg)',
      border: '1px solid #dee2e6',
    },
    text: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: '20px',
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    correctButton: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    incorrectButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    }
  };

  return (
    <div style={cardStyles.container}>
      <div style={cardStyles.card} onClick={flipCard}>
        <div style={{ ...cardStyles.face, ...cardStyles.front }}>
          <div style={cardStyles.text}>{card.english}</div>
        </div>
        <div style={{ ...cardStyles.face, ...cardStyles.back }}>
          <div style={cardStyles.text}>{card.chinese}</div>
          <div style={cardStyles.buttons}>
            <button 
              style={{ ...cardStyles.button, ...cardStyles.correctButton }} 
              onClick={(e) => { e.stopPropagation(); markAsCorrect(); }}
            >
              记住了
            </button>
            <button 
              style={{ ...cardStyles.button, ...cardStyles.incorrectButton }} 
              onClick={(e) => { e.stopPropagation(); markAsIncorrect(); }}
            >
              没记住
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
