import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CreateCard from './components/CreateCard';
import SearchCards from './components/SearchCards';
import ReviewCards from './components/ReviewCards';
import Statistics from './components/Statistics';
import McpToolsTester from './components/McpToolsTester';
import initialCards from './data';

function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [cards, setCards] = useState([]);

  // Load cards from localStorage on initial render
  useEffect(() => {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      setCards(initialCards);
    }
  }, []);

  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  const handleCardUpdate = (updatedCard) => {
    setCards(cards.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateCard onAddCard={handleAddCard} />;
      case 'search':
        return <SearchCards cards={cards} />;
      case 'review':
        return <ReviewCards cards={cards} onCardUpdate={handleCardUpdate} />;
      case 'stats':
        return <Statistics cards={cards} />;
      case 'mcp':
        return <McpToolsTester cards={cards} />;
      default:
        return <CreateCard onAddCard={handleAddCard} />;
    }
  };

  const styles = {
    app: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    content: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#f8f9fa',
      overflowY: 'auto',
    },
  };

  return (
    <div style={styles.app}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={styles.content}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
