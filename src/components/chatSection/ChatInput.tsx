import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { ChatInputProps } from '../../types/common';
import { useTranslation } from 'react-i18next';
import styles from '../../assets/styles/components/chatInput.module.scss';

const ChatInput: React.FC<ChatInputProps> = ({
  userQuery,
  setUserQuery,
  handleSubmit,
}) => {
  const [isInputActive, setIsInputActive] = useState(false);
  // Define the ref with the correct type
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'he';
  // const isRtl = i18n.dir() === 'rtl';
  // const isRtl = useSelector((state: RootState) => state.auth.rtl);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Programmatically submit the form
      e.currentTarget.form && e.currentTarget.form.requestSubmit();
    }
  };

  useEffect(() => {
    // Safely access the properties of the ref after checking it's not null
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = ''; // Reset height
      textarea.style.height = `${Math.min(textarea.scrollHeight, 6 * 20)}px`; // Adjust height based on the scrollHeight
    }
  }, [userQuery]);

  const inputPlaceHolder = isRtl
    ? 'הקלד את השאלה שלך כאן...'
    : t('enterQuestion');

  return (
    <>
      <div
        className={classnames(styles['message-input'], {
          active: isInputActive,
          rtl: isRtl,
        })}
      >
        <form className={styles['message-form']} onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Handle the 'Enter' key for submission
            placeholder={inputPlaceHolder}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            rows={1} // Start with 1 row
            className={classnames({ rtlTextArea: isRtl })}
          />
          <button
            type="submit"
            className={classnames(styles['send-message'], { rtlButton: isRtl })}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#3DC9F5" />
              <path
                d="M24.8147 24.1974L17.2834 25.4526C17.107 25.482 16.9598 25.6034 16.8972 25.7709L14.2993 32.7283C14.0507 33.3678 14.7201 33.9778 15.3337 33.671L33.3337 24.671C33.8865 24.3946 33.8865 23.6057 33.3337 23.3293L15.3337 14.3293C14.7201 14.0225 14.0507 14.6325 14.2993 15.272L16.8972 22.2294C16.9598 22.3969 17.107 22.5183 17.2834 22.5477L24.8147 23.8029C24.9236 23.821 24.9972 23.9241 24.9791 24.033C24.965 24.1173 24.899 24.1834 24.8147 24.1974Z"
                fill="white"
              />
            </svg>
          </button>
        </form>
      </div>

      <p className={classnames(styles['input-description'], { rtl: isRtl })}>
        {t('PoweredBy')}{' '}
        <a href="https://insightsui.morfix.com/tou-morfix-insights">
          {t('MelingoAI')}
        </a>
      </p>
    </>
  );
};

export default ChatInput;
