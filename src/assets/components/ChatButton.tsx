type ChatButtonProps = {
  handleOpen: () => void;
  isOpen: boolean;
};

const ChatButton = ({ handleOpen, isOpen }: ChatButtonProps) => {
  return (
    <button className="app-button" onClick={handleOpen}>
      {isOpen ? (
        <svg
          width="29"
          height="25"
          viewBox="0 0 29 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5261 9.11646C23.5075 9.37619 23.4799 9.64382 23.4393 9.92722C22.7644 14.6059 19.0553 18.0016 14.621 18.0016H13.1769L12.9121 18.2772C13.9083 20.1252 15.7597 21.332 17.8405 21.332H19.2761L22.117 24.2973C22.3006 24.4895 22.5497 24.5909 22.8038 24.5909C22.9227 24.5909 23.0427 24.5689 23.1582 24.5221C23.5182 24.3785 23.7537 24.0286 23.7537 23.6415V21.2171C26.398 20.6683 28.3559 18.1842 28.3559 15.184C28.3548 12.115 26.2565 9.57226 23.5261 9.11646Z"
            fill="white"
          />
          <path
            d="M22.0856 9.73227C22.1515 9.27251 22.1836 8.85952 22.1836 8.46738C22.1836 3.96563 18.7912 0.302246 14.6206 0.302246H8.087C3.91645 0.302246 0.523438 3.96563 0.523438 8.46738C0.523438 12.5088 3.19412 15.8437 6.7742 16.5103V19.9522C6.7742 20.4046 7.04915 20.8103 7.46835 20.9788C7.60245 21.0329 7.74162 21.0593 7.87966 21.0593C8.17659 21.0593 8.46676 20.9393 8.67974 20.7179L12.5917 16.6325H14.6206C18.3691 16.6325 21.5081 13.7309 22.0856 9.73227ZM5.98426 5.94381H16.614C16.911 5.94381 17.1533 6.1996 17.1533 6.51399C17.1533 6.82838 16.911 7.08361 16.614 7.08361H5.98426C5.68677 7.08361 5.44449 6.82838 5.44449 6.51399C5.44449 6.1996 5.68677 5.94381 5.98426 5.94381ZM12.3663 11.2327H5.98426C5.68677 11.2327 5.44449 10.9774 5.44449 10.6636C5.44449 10.3487 5.68677 10.0929 5.98426 10.0929H12.3663C12.6632 10.0929 12.9061 10.3487 12.9061 10.6636C12.9061 10.9774 12.6638 11.2327 12.3663 11.2327Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.29289 11.2929C5.68342 10.9024 6.31658 10.9024 6.70711 11.2929L16 20.5858L25.2929 11.2929C25.6834 10.9024 26.3166 10.9024 26.7071 11.2929C27.0976 11.6834 27.0976 12.3166 26.7071 12.7071L16.7071 22.7071C16.3166 23.0976 15.6834 23.0976 15.2929 22.7071L5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929Z"
            fill="white"
          />
        </svg>
      )}
    </button>
  );
};

export default ChatButton;
