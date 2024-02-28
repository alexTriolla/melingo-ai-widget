import React, { useState } from 'react';
import './App.css';
import AvatarIcon from './assets/svg/Avatar.svg';
import ChatIcon from './assets/svg/chat.svg';
import ArrowIcon from './assets/svg/Chevron.svg';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`widget ${isOpen ? 'widget-show' : ''}`}>
        <div className="widget-header">
          <div className="logo-container">
            <img src={AvatarIcon} alt="logo" />
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

      <button className="app-button" onClick={handleOpen}>
        <img src={isOpen ? ArrowIcon : ChatIcon} alt="button icon" />
      </button>
    </>
  );
}

export default App;
