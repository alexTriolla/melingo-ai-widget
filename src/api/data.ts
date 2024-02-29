import { AxiosResponse } from 'axios';
import api from '.';

// Generic type for handling requests
const handleRequest = async <T>(
  request: (url: string, config?: object) => Promise<AxiosResponse<T>>,
  url: string,
  config: object = {}
): Promise<T> => {
  try {
    const { data } = await request(url, config);
    return data;
  } catch (err) {
    // Depending on your error handling strategy, you may want to log this error or handle it differently
    console.error(err);
    throw err;
  }
};

export const sendMessage = <T>(message: string, userInfo: any): Promise<T> =>
  handleRequest<T>(api.post, 'get-query', { message, userInfo });

// export const resetChat = <T>(): Promise<T> =>
//   handleRequest<T>(api.post, 'reset-chat', {
//     username: 'mel_chat_bot_app_user',
//     password: 'MelChatBotAppUser2024!',
//     reset_chat: true,
//   });

export const resetChat = <T>(userInfo: any): Promise<T> =>
  handleRequest<T>(api.post, 'reset-chat', {
    message: '',
    userInfo,
    username: 'mel_chat_bot_app_user',
    password: 'MelChatBotAppUser2024!',
    reset_chat: true,
  });
