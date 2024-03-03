import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import classNames from 'classnames';
import ChatButton from './components/ChatButton';
import styles from './assets/styles/components/widget.module.scss';
import Content from './components/Content';
import { MessageType } from './types/common';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={classNames(styles.widget, {
          [styles['widget-show']]: isOpen,
        })}
      >
        <Header {...{ setMessages, handleOpen }} />
        <Content {...{ messages, setMessages }} />
      </div>

      <ChatButton handleOpen={handleOpen} isOpen={isOpen} />
    </>
  );
}

export default App;
