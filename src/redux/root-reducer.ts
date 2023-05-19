import { combineReducers } from '@reduxjs/toolkit'

import { authReducer as auth } from './auth.slice'
import { authApi } from './auth.api'
import { userApi } from './user.api'
import { incomeApi } from './income.api'

const rootReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [incomeApi.reducerPath]: incomeApi.reducer,
})

export default rootReducer
