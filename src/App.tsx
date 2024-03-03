import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import classNames from 'classnames';
import ChatButton from './components/ChatButton';
import styles from './assets/styles/components/widget.module.scss';
import Content from './components/Content';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={classNames(styles.widget, {
          [styles['widget-show']]: isOpen,
        })}
      >
        <Header onClose={handleOpen} />
        <Content />
      </div>

      <ChatButton handleOpen={handleOpen} isOpen={isOpen} />
    </>
  );
}

export default App;
