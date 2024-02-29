import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './assets/components/Header';
import classNames from 'classnames';
import ChatButton from './assets/components/ChatButton';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={classNames('widget', {
          'widget-show': isOpen,
        })}
      >
        <Header onClose={handleOpen} />
        <div className="widget-content">
          <p>Content</p>
        </div>
      </div>

      <ChatButton handleOpen={handleOpen} isOpen={isOpen} />
    </>
  );
}

export default App;
