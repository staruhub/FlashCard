import { useState } from 'react';

const CreateCard = ({ onAddCard }) => {
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!english.trim() || !chinese.trim()) {
      setMessage({ text: '请填写英文和中文内容', type: 'error' });
      return;
    }

    const newCard = {
      id: Date.now(),
      english: english.trim(),
      chinese: chinese.trim(),
      reviewed: false,
      correct: false
    };

    onAddCard(newCard);
    setEnglish('');
    setChinese('');
    setMessage({ text: '闪卡创建成功！', type: 'success' });
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#343a40',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#495057',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      outline: 'none',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px',
    },
    message: {
      padding: '10px',
      borderRadius: '4px',
      marginTop: '15px',
      textAlign: 'center',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
    },
    preview: {
      marginTop: '30px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    previewTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#343a40',
    },
    previewCard: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    previewSide: {
      flex: 1,
      padding: '10px',
      textAlign: 'center',
    },
    previewLabel: {
      fontSize: '14px',
      color: '#6c757d',
      marginBottom: '5px',
    },
    previewText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#212529',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>创建新闪卡</h2>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="english">英文单词/短语：</label>
          <input
            style={styles.input}
            type="text"
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="输入英文单词或短语"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="chinese">中文翻译：</label>
          <input
            style={styles.input}
            type="text"
            id="chinese"
            value={chinese}
            onChange={(e) => setChinese(e.target.value)}
            placeholder="输入中文翻译"
          />
        </div>
        
        <button style={styles.button} type="submit">创建闪卡</button>
      </form>
      
      {message.text && (
        <div style={{
          ...styles.message,
          ...(message.type === 'error' ? styles.error : styles.success)
        }}>
          {message.text}
        </div>
      )}
      
      {english || chinese ? (
        <div style={styles.preview}>
          <h3 style={styles.previewTitle}>预览</h3>
          <div style={styles.previewCard}>
            <div style={styles.previewSide}>
              <div style={styles.previewLabel}>英文</div>
              <div style={styles.previewText}>{english || '...'}</div>
            </div>
            <div style={styles.previewSide}>
              <div style={styles.previewLabel}>中文</div>
              <div style={styles.previewText}>{chinese || '...'}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateCard;
