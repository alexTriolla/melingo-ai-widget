
const Header = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="widget-header">
      <div className="logo-container">
        {/* <img src={AvatarIcon} alt="Avatar" /> */}
      </div>
      <div className="title-container">
        <p>Chatbot Name</p>
        <span>Our bot will reply instantly</span>
      </div>
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Header;
