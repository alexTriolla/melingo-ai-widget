import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { chatApi } from '../services/chatService';

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
