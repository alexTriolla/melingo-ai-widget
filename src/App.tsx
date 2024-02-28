import React, { useState } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <div className="app-container">
        {isOpen ? (
          <div className="widget">
            <div className="widget-header">
              <div className="logo-container">
                <img src="https://via.placeholder.com/50" alt="logo" />
              </div>
              <div className="title-container">
                <p>Chatbot Name</p>
                <span>Our bot will reply instantly</span>
              </div>
              <button className="close-button" onClick={handleOpen}>
                X
              </button>
            </div>
            <div className="widget-content">
              <p>Content</p>
            </div>
          </div>
        ) : (
          <button className="app-button" onClick={handleOpen}>
            OPEN
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
