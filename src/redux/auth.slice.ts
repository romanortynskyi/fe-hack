import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit'

import UserEntity from '~/types/interfaces/user-entity'

interface AuthState {
	user: UserEntity | null
  email: string | null,
  recoveryCode: number | null,
  isFetchingUpdateUser: boolean
  isFetchingDeleteUser: boolean
  isFetchingGetMe: boolean
  isFetching: boolean
  isFetchingUserImage: boolean
	error?: string | null
}

export const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>, string>({
  name: 'auth',
  initialState: {
    user: null,
    email: null,
    recoveryCode: null,
    isFetchingUpdateUser: false,
    isFetchingDeleteUser: false,
    isFetchingGetMe: true,
    isFetching: false,
    isFetchingUserImage: false,
		error: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setFetching: (state, { payload }) => {
      state.isFetching = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    setEmail: (state, { payload }) => {
      state.email = payload
    },
    setRecoveryCode: (state, { payload }) => {
      state.recoveryCode = payload
    },
  },
})

export const authReducer = authSlice.reducer

const {
  setFetching,
  setError,
  setUser,
  setEmail,
  setRecoveryCode,
} = authSlice.actions

export const authActions = {
  setFetching,
  setError,
  setUser,
  setEmail,
  setRecoveryCode,
}
