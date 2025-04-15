const Statistics = ({ cards }) => {
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
    </div>
  );
};

export default Statistics;
