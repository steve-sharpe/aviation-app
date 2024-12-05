import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    margin: '20px 0',
    textAlign: 'center',
  },
  input: {
    width: '60%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
};

export default SearchBar;
