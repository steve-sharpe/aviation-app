import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Charts from './Charts';

function Dashboard({ selectedReport, reportData }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Normalize and filter the data based on the search term
  const filteredData = Array.isArray(reportData)
    ? reportData.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      )
    : reportData
    ? [reportData] // Wrap single object in an array
    : [];

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
      <p>Selected Report: {selectedReport || 'None'}</p>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Charts for Visualization */}
      <Charts reportData={filteredData} selectedReport={selectedReport} />

      {/* Filtered Data Display
      <div style={styles.grid}>
        {filteredData.length ? (
          filteredData.map((item, index) => (
            <div key={index} style={styles.card}>
              <pre style={styles.pre}>{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))
        ) : (
          <p>No matching data found.</p>
        )}
      </div>*/}
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
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  container: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
};

export default Dashboard;
