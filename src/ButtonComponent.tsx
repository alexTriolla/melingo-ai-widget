import { useEffect, useState } from 'react';
import ChatButton from './components/ChatButton';

export default function ButtonComponent({
  handleOpen,
  myEventBus,
}: {
  handleOpen: () => void;
  myEventBus: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    myEventBus.emit('open-chat', isOpen);
  }, [myEventBus, isOpen]);

  useEffect(() => {
    myEventBus.on('open-chat', ({ detail }: { detail: boolean }) => {
      setIsOpen(detail);
    });
  }, [myEventBus]);

  return <ChatButton handleOpen={() => setIsOpen(!isOpen)} isOpen={isOpen} />;
}
