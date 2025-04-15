import { useState, useEffect } from 'react';

const SearchCards = ({ cards }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState(cards);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCards(cards);
    } else {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const results = cards.filter(card => 
        card.english.toLowerCase().includes(lowercaseSearchTerm) || 
        card.chinese.includes(lowercaseSearchTerm)
      );
      setFilteredCards(results);
    }
  }, [searchTerm, cards]);

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#343a40',
    },
    searchContainer: {
      marginBottom: '30px',
    },
    searchInput: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      outline: 'none',
    },
    resultsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    card: {
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    english: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#212529',
    },
    chinese: {
      fontSize: '16px',
      color: '#6c757d',
    },
    noResults: {
      textAlign: 'center',
      padding: '30px',
      fontSize: '18px',
      color: '#6c757d',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      width: '400px',
      maxWidth: '90%',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#343a40',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#6c757d',
    },
    modalBody: {
      marginBottom: '20px',
    },
    modalLabel: {
      fontSize: '14px',
      color: '#6c757d',
      marginBottom: '5px',
    },
    modalText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#212529',
      marginBottom: '15px',
    },
    status: {
      display: 'inline-block',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
      marginTop: '10px',
    },
    reviewed: {
      backgroundColor: '#e9ecef',
      color: '#495057',
    },
    correct: {
      backgroundColor: '#d4edda',
      color: '#155724',
    },
    incorrect: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>搜索闪卡</h2>
      
      <div style={styles.searchContainer}>
        <input
          style={styles.searchInput}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入英文或中文搜索..."
        />
      </div>
      
      {filteredCards.length > 0 ? (
        <div style={styles.resultsContainer}>
          {filteredCards.map(card => (
            <div
              key={card.id}
              style={styles.card}
              onClick={() => setSelectedCard(card)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <div style={styles.english}>{card.english}</div>
              <div style={styles.chinese}>{card.chinese}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noResults}>
          没有找到匹配的闪卡
        </div>
      )}
      
      {selectedCard && (
        <div style={styles.modal} onClick={() => setSelectedCard(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>闪卡详情</div>
              <button style={styles.closeButton} onClick={() => setSelectedCard(null)}>×</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.modalLabel}>英文</div>
              <div style={styles.modalText}>{selectedCard.english}</div>
              
              <div style={styles.modalLabel}>中文</div>
              <div style={styles.modalText}>{selectedCard.chinese}</div>
              
              {selectedCard.reviewed ? (
                <div>
                  <span style={{...styles.status, ...styles.reviewed}}>已复习</span>
                  {selectedCard.correct ? (
                    <span style={{...styles.status, ...styles.correct}}>记住了</span>
                  ) : (
                    <span style={{...styles.status, ...styles.incorrect}}>未记住</span>
                  )}
                </div>
              ) : (
                <div style={{...styles.status, ...styles.reviewed}}>未复习</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCards;
