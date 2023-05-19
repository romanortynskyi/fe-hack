import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';

import { authApi } from './auth.api';
import { creditApi } from './credit.api';
import { depositApi } from './deposit.api';
import { expenseApi } from './expense.api';
import { incomeApi } from './income.api';
import rootReducer from './root-reducer';
import { userApi } from './user.api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      incomeApi.middleware,
      creditApi.middleware,
      depositApi.middleware,
      expenseApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export const useDispatch = () => useAppDispatch<Dispatch>();
