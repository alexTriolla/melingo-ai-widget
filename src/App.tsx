import { useState } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  position: relative;
`;

const Button = styled.button`
  background-color: #61dafb;
  color: #282c34;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #282c34;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  position: absolute;
  bottom: 0;
  right: 0;

  &:hover {
    background-color: #282c34;
    color: #61dafb;
  }
`;

const Widget = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  transform: translate(-50%, 0);
  padding: 1em;
  background-color: #fefefe;
  color: #61dafb;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const WidgetHeader = styled.div`
  font-size: 1.5em;
  display: flex;
  width: 100%;
  background-color: #0a0d36;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;

const TitleContainer = styled.div`
  flex: 1;
  text-align: left;

  p {
    font-size: 22px;
    font-weight: 700;
  }

  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  cursor: pointer;
`;

const WidgetContent = styled.div`
  p {
    // Styles for your content
  }
`;

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen ? (
        <Widget>
          <WidgetHeader>
            <LogoContainer>
              <img src="https://via.placeholder.com/50" alt="logo" />
            </LogoContainer>
            <TitleContainer>
              <p>Chatbot Name</p>
              <span>Our bot will replay instantly</span>
            </TitleContainer>
            <CloseButton onClick={handleOpen}>X</CloseButton>
          </WidgetHeader>
          <WidgetContent>
            <p>Content</p>
          </WidgetContent>
        </Widget>
      ) : (
        <Button onClick={handleOpen}>OPEN</Button>
      )}
    </div>
  );
}

export default App;
