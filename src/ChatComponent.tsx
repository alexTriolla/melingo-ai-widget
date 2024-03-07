import './assets/styles/global.scss';
import Header from './components/Header';
import classNames from 'classnames';
import styles from './assets/styles/components/widget.module.scss';
import Content from './components/Content';
import { useState } from 'react';
import { MessageType } from './types/common';

export default function ChatComponent() {
  console.log('ChatComponent rendering'); // Check if this logs in the console

  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleOpen = () => {};

  return (
    <div className={classNames(styles.widget)}>
      <Header {...{ setMessages, handleOpen }} />
      <Content {...{ messages, setMessages }} />
    </div>
  );
}
