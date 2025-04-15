import { useState, useEffect } from 'react';
import { useMcpTools } from '../mcp-integration';

const Statistics = ({ cards }) => {
  const { mcpStatus, isConnected, analyzeFlashcards, getLearningTips } = useMcpTools();
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [learningTips, setLearningTips] = useState([]);
  const [showMcpFeatures, setShowMcpFeatures] = useState(false);

  useEffect(() => {
    if (isConnected && cards.length > 0) {
      // 获取AI分析
      analyzeFlashcards(cards).then(analysis => {
        setAiAnalysis(analysis);
      });

      // 获取学习建议
      getLearningTips(cards).then(tips => {
        setLearningTips(tips);
      });
    }
  }, [isConnected, cards, analyzeFlashcards, getLearningTips]);
  // Calculate statistics
  const totalCards = cards.length;
  const reviewedCards = cards.filter(card => card.reviewed).length;
  const correctCards = cards.filter(card => card.reviewed && card.correct).length;
  const incorrectCards = reviewedCards - correctCards;

  const reviewedPercentage = totalCards > 0 ? (reviewedCards / totalCards) * 100 : 0;
  const correctPercentage = reviewedCards > 0 ? (correctCards / reviewedCards) * 100 : 0;
  const incorrectPercentage = reviewedCards > 0 ? (incorrectCards / reviewedCards) * 100 : 0;

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#343a40',
      textAlign: 'center',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    statValue: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    statLabel: {
      fontSize: '16px',
      color: '#6c757d',
    },
    chartContainer: {
      marginTop: '40px',
    },
    chartTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#343a40',
      textAlign: 'center',
    },
    barChart: {
      display: 'flex',
      height: '300px',
      borderLeft: '2px solid #dee2e6',
      borderBottom: '2px solid #dee2e6',
      padding: '20px 0 0 0',
      position: 'relative',
    },
    yAxis: {
      position: 'absolute',
      left: '-40px',
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: '20px',
    },
    yLabel: {
      fontSize: '12px',
      color: '#6c757d',
    },
    xAxis: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '-30px',
      display: 'flex',
      justifyContent: 'space-around',
    },
    xLabel: {
      fontSize: '14px',
      color: '#6c757d',
      textAlign: 'center',
    },
    bar: {
      flex: 1,
      margin: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative',
    },
    barFill: {
      width: '60px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      position: 'relative',
    },
    barLabel: {
      position: 'absolute',
      top: '-25px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    pieChart: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: `conic-gradient(
        #28a745 0% ${correctPercentage}%,
        #dc3545 ${correctPercentage}% 100%
      )`,
      margin: '30px auto',
      position: 'relative',
    },
    pieChartLabel: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#343a40',
      backgroundColor: 'white',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    legend: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '14px',
      color: '#6c757d',
    },
    legendColor: {
      width: '15px',
      height: '15px',
      borderRadius: '3px',
    },
    noData: {
      textAlign: 'center',
      padding: '50px 20px',
      fontSize: '18px',
      color: '#6c757d',
    },
    // MCP相关样式
    mcpContainer: {
      marginTop: '40px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    mcpHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    mcpStatus: {
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    mcpToggleButton: {
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    mcpFeatures: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    mcpCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    mcpCardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#343a40',
      borderBottom: '1px solid #dee2e6',
      paddingBottom: '10px',
    },
    mcpCardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    mcpItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    mcpLabel: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#6c757d',
    },
    mcpValue: {
      fontSize: '16px',
      color: '#212529',
    },
    mcpWordList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '5px',
    },
    mcpWord: {
      padding: '5px 10px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      fontSize: '14px',
      color: '#495057',
    },
    tipsList: {
      margin: 0,
      padding: '0 0 0 20px',
    },
    tipItem: {
      margin: '8px 0',
      color: '#495057',
      fontSize: '14px',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>学习统计</h2>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#007bff'}}>{totalCards}</div>
          <div style={styles.statLabel}>总闪卡数</div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#6f42c1'}}>{reviewedCards}</div>
          <div style={styles.statLabel}>已复习</div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#28a745'}}>{correctCards}</div>
          <div style={styles.statLabel}>记住的</div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statValue, color: '#dc3545'}}>{incorrectCards}</div>
          <div style={styles.statLabel}>未记住的</div>
        </div>
      </div>

      {totalCards > 0 ? (
        <>
          <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>复习进度</h3>
            <div style={styles.barChart}>
              <div style={styles.yAxis}>
                <div style={styles.yLabel}>100%</div>
                <div style={styles.yLabel}>75%</div>
                <div style={styles.yLabel}>50%</div>
                <div style={styles.yLabel}>25%</div>
                <div style={styles.yLabel}>0%</div>
              </div>

              <div style={styles.bar}>
                <div
                  style={{
                    ...styles.barFill,
                    height: `${reviewedPercentage}%`,
                    backgroundColor: '#6f42c1',
                  }}
                >
                  <span style={styles.barLabel}>{Math.round(reviewedPercentage)}%</span>
                </div>
              </div>
            </div>
            <div style={styles.xAxis}>
              <div style={styles.xLabel}>已复习比例</div>
            </div>
          </div>

          {reviewedCards > 0 && (
            <div style={styles.chartContainer}>
              <h3 style={styles.chartTitle}>记忆效果</h3>
              <div style={styles.pieChart}>
                <div style={styles.pieChartLabel}>{Math.round(correctPercentage)}%</div>
              </div>
              <div style={styles.legend}>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: '#28a745'}}></div>
                  <span>记住了 ({correctCards})</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: '#dc3545'}}></div>
                  <span>没记住 ({incorrectCards})</span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={styles.noData}>
          没有可用的统计数据。请先创建并复习一些闪卡。
        </div>
      )}

      {/* MCP功能区域 */}
      <div style={styles.mcpContainer}>
        <div style={styles.mcpHeader}>
          <h3 style={styles.chartTitle}>AI学习助手 (MCP)</h3>
          <div style={{
            ...styles.mcpStatus,
            backgroundColor: isConnected ? '#d4edda' : '#f8d7da',
            color: isConnected ? '#155724' : '#721c24',
          }}>
            {mcpStatus}
          </div>
          <button
            style={{
              ...styles.mcpToggleButton,
              opacity: isConnected ? 1 : 0.5,
              cursor: isConnected ? 'pointer' : 'not-allowed'
            }}
            onClick={() => isConnected && setShowMcpFeatures(!showMcpFeatures)}
            disabled={!isConnected}
          >
            {showMcpFeatures ? '隐藏AI功能' : '显示AI功能'}
          </button>
        </div>

        {showMcpFeatures && isConnected && (
          <div style={styles.mcpFeatures}>
            {aiAnalysis && (
              <div style={styles.mcpCard}>
                <h4 style={styles.mcpCardTitle}>AI学习分析</h4>
                <div style={styles.mcpCardContent}>
                  <div style={styles.mcpItem}>
                    <span style={styles.mcpLabel}>学习进度:</span>
                    <span style={styles.mcpValue}>{aiAnalysis.learningProgress}%</span>
                  </div>

                  {aiAnalysis.difficultWords.length > 0 && (
                    <div style={styles.mcpItem}>
                      <span style={styles.mcpLabel}>需要加强的单词:</span>
                      <div style={styles.mcpWordList}>
                        {aiAnalysis.difficultWords.map((word, index) => (
                          <span key={index} style={styles.mcpWord}>{word}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={styles.mcpItem}>
                    <span style={styles.mcpLabel}>学习建议:</span>
                    <span style={styles.mcpValue}>{aiAnalysis.recommendedReviewStrategy}</span>
                  </div>
                </div>
              </div>
            )}

            {learningTips.length > 0 && (
              <div style={styles.mcpCard}>
                <h4 style={styles.mcpCardTitle}>学习技巧</h4>
                <ul style={styles.tipsList}>
                  {learningTips.map((tip, index) => (
                    <li key={index} style={styles.tipItem}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
