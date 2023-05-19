import { combineReducers } from '@reduxjs/toolkit';

import { authReducer as auth } from './auth.slice';
import { authApi } from './auth.api';
import { userApi } from './user.api';
import { incomeApi } from './income.api';
import { creditApi } from './credit.api';
import { depositApi } from './deposit.api';

const rootReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [incomeApi.reducerPath]: incomeApi.reducer,
  [creditApi.reducerPath]: creditApi.reducer,
  [depositApi.reducerPath]: depositApi.reducer,
});

export default rootReducer;
