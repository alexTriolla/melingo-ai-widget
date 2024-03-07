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

  const handleOpen = () => {};

  useEffect(() => {
    // document.addEventListener('message', (event) => {
    //   console.log(event);
    // });

    myEventBus.on('open-chat', ({ detail }: { detail: boolean }) => {
      setIsOpen(detail);
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
