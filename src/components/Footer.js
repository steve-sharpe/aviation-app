import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Aviation App. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '10px 0',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
};

export default Footer;
