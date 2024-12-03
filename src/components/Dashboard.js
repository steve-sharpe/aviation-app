import React from 'react';

function Dashboard({ selectedReport, reportData }) {
  if (!reportData || reportData.error) {
    return (
      <div style={styles.container}>
        <h2>Dashboard</h2>
        <p>{reportData?.error || 'No data to display.'}</p>
      </div>
    );
  }

  return (
    <div style={styles.dashboard}>
      <h2>Dashboard</h2>
      <div style={styles.grid}>
        {/* Example metrics */}
        <div style={styles.card}>
          <h3>Total Items</h3>
          <p>{Array.isArray(reportData) ? reportData.length : 'N/A'}</p>
        </div>
        <div style={styles.card}>
          <h3>Selected Report</h3>
          <p>{selectedReport}</p>
        </div>
        <div style={styles.card}>
          <h3>First Entry</h3>
          <pre style={styles.pre}>
            {Array.isArray(reportData) && reportData.length
              ? JSON.stringify(reportData[0], null, 2)
              : 'No data'}
          </pre>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  pre: {
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
  },
};

export default Dashboard;
