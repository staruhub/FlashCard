import { useState } from 'react';
import { useMcpTools } from '../mcp-integration';

const McpToolsTester = ({ cards }) => {
  const {
    mcpStatus,
    isConnected,
    analyzeFlashcards,
    getLearningTips,
    generateLearningPlan,
    generateMemoryTechniques,
    generateExampleSentences,
    testMcpConnection
  } = useMcpTools();

  const [selectedTool, setSelectedTool] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [sentenceCount, setSentenceCount] = useState(3);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setResult(null);
  };

  const handleTestConnection = async () => {
    setLoading(true);
    const response = await testMcpConnection();
    setResult(response);
    setLoading(false);
  };

  const handleRunTool = async () => {
    setLoading(true);
    let response = null;

    try {
      switch (selectedTool) {
        case 'analyzeFlashcards':
          response = await analyzeFlashcards(cards);
          break;
        case 'getLearningTips':
          response = await getLearningTips(cards);
          break;
        case 'generateLearningPlan':
          response = await generateLearningPlan(cards, daysPerWeek);
          break;
        case 'generateMemoryTechniques':
          if (!selectedWord) {
            alert('请选择一个单词');
            setLoading(false);
            return;
          }
          response = await generateMemoryTechniques(selectedWord);
          break;
        case 'generateExampleSentences':
          if (!selectedWord) {
            alert('请选择一个单词');
            setLoading(false);
            return;
          }
          response = await generateExampleSentences(selectedWord, sentenceCount);
          break;
        default:
          response = { error: '未知工具' };
      }

      setResult(response);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

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
      textAlign: 'center',
    },
    statusBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 15px',
      backgroundColor: isConnected ? '#d4edda' : '#f8d7da',
      color: isConnected ? '#155724' : '#721c24',
      borderRadius: '4px',
      marginBottom: '20px',
    },
    testButton: {
      padding: '8px 16px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    toolsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '30px',
    },
    toolCard: {
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    selectedTool: {
      backgroundColor: '#e9ecef',
      borderColor: '#adb5bd',
      boxShadow: '0 0 0 3px rgba(108, 117, 125, 0.25)',
    },
    toolName: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    toolDescription: {
      fontSize: '14px',
      color: '#6c757d',
    },
    optionsContainer: {
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
    },
    optionGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    select: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ced4da',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ced4da',
    },
    runButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    resultContainer: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    resultTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#343a40',
      borderBottom: '1px solid #dee2e6',
      paddingBottom: '10px',
    },
    resultContent: {
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
      maxHeight: '300px',
      overflowY: 'auto',
    },
    loading: {
      textAlign: 'center',
      padding: '20px',
      color: '#6c757d',
    },
    wordList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '10px',
    },
    wordChip: {
      padding: '5px 10px',
      backgroundColor: '#e9ecef',
      borderRadius: '20px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    selectedWordChip: {
      backgroundColor: '#007bff',
      color: 'white',
    },
  };

  const tools = [
    {
      id: 'testConnection',
      name: '测试MCP连接',
      description: '测试与MCP服务器的连接状态',
    },
    {
      id: 'analyzeFlashcards',
      name: '分析闪卡',
      description: '分析闪卡学习情况并提供反馈',
    },
    {
      id: 'getLearningTips',
      name: '获取学习建议',
      description: '获取针对当前学习情况的建议',
    },
    {
      id: 'generateLearningPlan',
      name: '生成学习计划',
      description: '根据闪卡数量生成学习计划',
    },
    {
      id: 'generateMemoryTechniques',
      name: '生成记忆技巧',
      description: '为特定单词生成记忆技巧',
    },
    {
      id: 'generateExampleSentences',
      name: '生成例句',
      description: '为特定单词生成例句',
    },
  ];

  // 从闪卡中提取所有英文单词
  const availableWords = cards.map(card => card.english);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>MCP工具测试</h2>
      
      <div style={styles.statusBar}>
        <div>MCP状态: {mcpStatus}</div>
        <button 
          style={styles.testButton} 
          onClick={handleTestConnection}
          disabled={loading}
        >
          测试连接
        </button>
      </div>
      
      <div style={styles.toolsGrid}>
        {tools.map(tool => (
          <div 
            key={tool.id}
            style={{
              ...styles.toolCard,
              ...(selectedTool === tool.id || (tool.id === 'testConnection' && selectedTool === '') ? styles.selectedTool : {})
            }}
            onClick={() => handleToolSelect(tool.id)}
          >
            <div style={styles.toolName}>{tool.name}</div>
            <div style={styles.toolDescription}>{tool.description}</div>
          </div>
        ))}
      </div>
      
      {selectedTool && selectedTool !== 'testConnection' && (
        <div style={styles.optionsContainer}>
          {(selectedTool === 'generateMemoryTechniques' || selectedTool === 'generateExampleSentences') && (
            <div style={styles.optionGroup}>
              <label style={styles.label}>选择单词:</label>
              <select 
                style={styles.select}
                value={selectedWord}
                onChange={(e) => setSelectedWord(e.target.value)}
              >
                <option value="">-- 请选择单词 --</option>
                {availableWords.map((word, index) => (
                  <option key={index} value={word}>{word}</option>
                ))}
              </select>
              
              <div style={styles.wordList}>
                {['Hello', 'Thank you', 'Goodbye'].map((word) => (
                  <div 
                    key={word}
                    style={{
                      ...styles.wordChip,
                      ...(selectedWord === word ? styles.selectedWordChip : {})
                    }}
                    onClick={() => setSelectedWord(word)}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedTool === 'generateLearningPlan' && (
            <div style={styles.optionGroup}>
              <label style={styles.label}>每周学习天数:</label>
              <input 
                type="number" 
                style={styles.input}
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                min="1"
                max="7"
              />
            </div>
          )}
          
          {selectedTool === 'generateExampleSentences' && (
            <div style={styles.optionGroup}>
              <label style={styles.label}>例句数量:</label>
              <input 
                type="number" 
                style={styles.input}
                value={sentenceCount}
                onChange={(e) => setSentenceCount(parseInt(e.target.value))}
                min="1"
                max="5"
              />
            </div>
          )}
          
          <button 
            style={{
              ...styles.runButton,
              ...(loading ? styles.disabledButton : {})
            }}
            onClick={handleRunTool}
            disabled={loading}
          >
            {loading ? '执行中...' : '执行工具'}
          </button>
        </div>
      )}
      
      {loading && (
        <div style={styles.loading}>
          正在处理请求，请稍候...
        </div>
      )}
      
      {result && (
        <div style={styles.resultContainer}>
          <div style={styles.resultTitle}>执行结果</div>
          <div style={styles.resultContent}>
            {JSON.stringify(result, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default McpToolsTester;
