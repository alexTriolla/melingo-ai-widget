import React from 'react';
import classnames from 'classnames';
import { MessageComponentProps } from '../../types/common';
import { PulseLoader } from 'react-spinners';
import styles from '../../assets/styles/components/message.module.scss';

/**
 * Message component to display a chat message.
 * It dynamically shows different styles and icons based on the message sender.
 */
const Message: React.FC<MessageComponentProps> = ({ message, isRtl }) => {
  const isMelingoMessage = message.sender === 'melingo';
  const isUserMessage = message.sender === 'user';
  const now = new Date();
  function padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }

  // function getMessageUserAvatar() {
  //   if (isUserMessage) {
  //     return userAvatar;
  //   }
  //   return ChatLogoIcon;
  // }

  const hoursAndMinutes = now.getHours() + ':' + padTo2Digits(now.getMinutes());

  return (
    <>
      <div
        className={classnames({
          [styles['message-loading']]: message.loading,
          [styles['melingo-message-rtl']]: isMelingoMessage && isRtl,
          [styles['melingo-message']]: isMelingoMessage,
          [styles['user-message-rtl']]: isUserMessage && isRtl,
          [styles['user-message']]: isUserMessage,
          error: message.error, // Apply error styling if there's an error
        })}
      >
        {/* Display chat logo for Melingo's messages if there's no error */}
        {!message.error && (
          <div
            className={
              isMelingoMessage ? styles['chat-logo'] : styles['user-chat-logo']
            }
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="32" height="32" rx="16" fill="#0A0D36" />
              <rect
                x="5.33398"
                y="5.3335"
                width="21.3333"
                height="21.3333"
                fill="url(#pattern0)"
              />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xmlnsXlink="#image0_951_4825"
                    transform="translate(-0.00436047) scale(0.0104167)"
                  />
                </pattern>
                <image
                  id="image0_951_4825"
                  width="300"
                  height="96"
                  xmlnsXlink="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
        )}

        {/* Display appropriate bubble icon based on the message sender */}
        {/* {!message.error && !message.loading && (
        <img
          src={BubbleMelingoIcon}
          alt="Bubble Icon"
          className={classnames('bubble', {
            'user-message-bubble': isUserMessage,
            'user-message-bubble-rtl': isUserMessage && isRtl,
          })}
        />
      )} */}

        {/* Display the message text */}
        <div className={styles['message-text']}>
          {message.loading && isMelingoMessage && (
            <div className={styles['melingo-loading-name']}>
              Melingo AI Agent
            </div>
          )}
          {message.loading ? (
            <PulseLoader color="#B9B7CD" margin={4} size={8} />
          ) : (
            message.text
          )}
        </div>
      </div>

      {!message.loading && (
        <div
          className={classnames({
            [styles['user-message-info']]: isUserMessage,
            [styles['user-message-info-rtl']]: isUserMessage && isRtl,
            [styles['melingo-message-info']]: isMelingoMessage,
            [styles['melingo-message-info-rtl']]: isMelingoMessage && isRtl,
          })}
        >
          Melingo AI {isUserMessage ? 'User' : 'Agent'} | {hoursAndMinutes}
        </div>
      )}
    </>
  );
};

export default Message;
