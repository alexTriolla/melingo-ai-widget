import './assets/styles/global.scss';
import Header from './components/Header';
import classNames from 'classnames';
import styles from './assets/styles/components/widget.module.scss';
import Content from './components/Content';
import { useEffect, useState } from 'react';
import { MessageType } from './types/common';

export default function ChatComponent({ myEventBus }: { myEventBus: any }) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    myEventBus.emit('open-chat', isOpen);
  }, [myEventBus, isOpen]);

  useEffect(() => {
    myEventBus.on('open-chat', ({ detail }: { detail: boolean }) => {
      setIsOpen(detail);

      const chatContainer =
        document.querySelector<HTMLElement>('#chat-container');

      if (chatContainer) {
        chatContainer.style.pointerEvents = detail ? 'auto' : 'none';
      }
    });
  }, [myEventBus]);

  return (
    <div
      className={classNames(styles.widget, {
        [styles.widgetShow]: isOpen,
      })}
    >
      <Header {...{ setMessages, handleOpen }} />
      <Content {...{ messages, setMessages }} />
    </div>
  );
}
