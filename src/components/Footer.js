import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
        <p>Built with React & Node.js</p>
      </div>
    </footer>
  );
};

export default Footer;