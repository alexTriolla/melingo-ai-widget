import { resetChat } from '../api/data';
import styles from '../assets/styles/components/header.module.scss';
import { MessageType } from '../types/common';

const Header = ({
  setMessages,
  handleOpen,
}: {
  setMessages: (param: MessageType[]) => void;
  handleOpen: () => void;
}) => {
  const closeWidget = () => {
    resetChat();
    setMessages([]);
    handleOpen();
  };

  return (
    <div className={styles.widgetHeader}>
      <div className={styles.logoContainer}>
        {/* <img src={AvatarIcon} alt="Avatar" /> */}
      </div>
      <div className={styles.titleContainer}>
        <p>Chatbot Name</p>
        <span>Our bot will reply instantly</span>
      </div>
      <div className={styles.button} onClick={handleOpen}>
        <svg
          width="18"
          height="2"
          viewBox="0 0 18 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.753906 1.49951H17.2458C17.66 1.49951 17.9958 1.16373 17.9958 0.749512C17.9958 0.335298 17.66 -0.000488281 17.2458 -0.000488281H0.753906C0.339693 -0.000488281 0.00390625 0.335298 0.00390625 0.749512C0.00390625 1.16373 0.339693 1.49951 0.753906 1.49951Z"
            fill="#F4EFFF"
          />
        </svg>
      </div>
      <div className={styles.button} onClick={closeWidget}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.39705 4.55379L4.46967 4.46967C4.73594 4.2034 5.1526 4.1792 5.44621 4.39705L5.53033 4.46967L12 10.939L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.061 12L19.5303 18.4697C19.7966 18.7359 19.8208 19.1526 19.6029 19.4462L19.5303 19.5303C19.2641 19.7966 18.8474 19.8208 18.5538 19.6029L18.4697 19.5303L12 13.061L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.939 12L4.46967 5.53033C4.2034 5.26406 4.1792 4.8474 4.39705 4.55379L4.46967 4.46967L4.39705 4.55379Z"
            fill="#F4EFFF"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;
