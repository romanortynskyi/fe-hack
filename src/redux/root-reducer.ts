import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from './auth.api';
import { authReducer as auth } from './auth.slice';
import { creditApi } from './credit.api';
import { depositApi } from './deposit.api';
import { expenseApi } from './expense.api';
import { incomeApi } from './income.api';
import { userApi } from './user.api';

const rootReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [incomeApi.reducerPath]: incomeApi.reducer,
  [creditApi.reducerPath]: creditApi.reducer,
  [depositApi.reducerPath]: depositApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
});

export default rootReducer;
