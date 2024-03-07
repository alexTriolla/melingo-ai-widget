import ChatButton from './components/ChatButton';

export default function ButtonComponent({
  handleOpen,
}: {
  handleOpen: () => void;
}) {
  return <ChatButton handleOpen={handleOpen} isOpen={true} />;
}
