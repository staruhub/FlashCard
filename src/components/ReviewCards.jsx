import { useState, useEffect } from 'react';
import FlashCard from './FlashCard';

const ReviewCards = ({ cards, onCardUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewableCards, setReviewableCards] = useState([]);

  useEffect(() => {
    // Filter out cards that have already been reviewed
    const cardsToReview = cards.filter(card => !card.reviewed);
    setReviewableCards(cardsToReview);
  }, [cards]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') {
        navigateToPrevious();
      } else if (e.code === 'ArrowRight') {
        navigateToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, reviewableCards.length]);

  const navigateToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const navigateToNext = () => {
    if (currentIndex < reviewableCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCardUpdate = (updatedCard) => {
    onCardUpdate(updatedCard);
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#343a40',
      textAlign: 'center',
    },
    progress: {
      width: '100%',
      marginBottom: '30px',
    },
    progressText: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      fontSize: '16px',
      color: '#6c757d',
    },
    progressBar: {
      height: '10px',
      backgroundColor: '#e9ecef',
      borderRadius: '5px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#007bff',
      transition: 'width 0.3s',
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '30px',
    },
    navButton: {
      padding: '10px 20px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    instructions: {
      marginTop: '30px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      fontSize: '14px',
      color: '#6c757d',
      textAlign: 'center',
      lineHeight: '1.5',
    },
    noCards: {
      textAlign: 'center',
      padding: '50px 20px',
      fontSize: '18px',
      color: '#6c757d',
    },
    completedMessage: {
      textAlign: 'center',
      padding: '50px 20px',
      fontSize: '24px',
      color: '#28a745',
      fontWeight: 'bold',
    },
    resetButton: {
      padding: '12px 24px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px',
    },
  };

  if (cards.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>复习闪卡</h2>
        <div style={styles.noCards}>
          没有可用的闪卡。请先创建一些闪卡。
        </div>
      </div>
    );
  }

  if (reviewableCards.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>复习闪卡</h2>
        <div style={styles.completedMessage}>
          恭喜！你已经复习完所有闪卡。
        </div>
        <button 
          style={styles.resetButton}
          onClick={() => {
            // Reset all cards to unreviewed
            cards.forEach(card => {
              onCardUpdate({ ...card, reviewed: false, correct: false });
            });
          }}
        >
          重新开始复习
        </button>
      </div>
    );
  }

  const progressPercentage = (currentIndex / reviewableCards.length) * 100;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>复习闪卡</h2>
      
      <div style={styles.progress}>
        <div style={styles.progressText}>
          <span>进度: {currentIndex + 1} / {reviewableCards.length}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      
      <FlashCard 
        card={reviewableCards[currentIndex]} 
        onCardUpdate={handleCardUpdate} 
      />
      
      <div style={styles.navigation}>
        <button 
          style={{
            ...styles.navButton,
            ...(currentIndex === 0 ? styles.disabledButton : {})
          }}
          onClick={navigateToPrevious}
          disabled={currentIndex === 0}
        >
          ← 上一个
        </button>
        <button 
          style={{
            ...styles.navButton,
            ...(currentIndex === reviewableCards.length - 1 ? styles.disabledButton : {})
          }}
          onClick={navigateToNext}
          disabled={currentIndex === reviewableCards.length - 1}
        >
          下一个 →
        </button>
      </div>
      
      <div style={styles.instructions}>
        <p>提示：点击卡片或按空格键翻转卡片。使用左右箭头键导航。</p>
        <p>查看背面后，请选择"记住了"或"没记住"来记录你的学习进度。</p>
      </div>
    </div>
  );
};

export default ReviewCards;
