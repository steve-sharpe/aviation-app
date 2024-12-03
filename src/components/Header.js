import React from 'react';

function Header() {
  return (
    <header style={styles.header}>
      <h1>Aviation App</h1>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 0',
    textAlign: 'center',
  },
};

export default Header;
