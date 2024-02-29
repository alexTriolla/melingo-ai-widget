import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'http://a3c5e9cd58a734f708a2266883d8c41c-287846994.il-central-1.elb.amazonaws.com:8088',
  }),
  endpoints: (builder) => ({
    fetchFiles: builder.query({
      query: (query) => ({
        url: 'get-query',
        method: 'POST',
        body: {
          username: 'mel_chat_bot_app_user',
          password: 'MelChatBotAppUser2024!',
          query,
          userInfo: {
            // company: 'triolla',
            // dataset_name: 'data',
            // email: 'nimrod+22@triolla.io',
            // name: 'nimrod',
            // sub: 'ca73328c-2031-7032-c422-18c4e54b4da7',
          },
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useFetchFilesQuery } = chatApi;
