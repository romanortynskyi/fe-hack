import { SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import UserEntity from '~/types/interfaces/user-entity'

interface AuthState {
	user: UserEntity | null
  email: string | null
  recoveryCode: number | null
  isFetchingGetMe: boolean
  isFetching: boolean
	error?: string | null
}

const getMe = createAsyncThunk(
  'auth/get-me',
  async () => {
    const token = localStorage.getItem('token')

    if (token) {
      const url = `${import.meta.env.VITE_API_URL}/auth/me`
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      const user = await response.json()
          
      return user as UserEntity
    }

    return null    
  },
)

export const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>, string>({
  name: 'auth',
  initialState: {
    user: null,
    email: null,
    recoveryCode: null,
    isFetchingGetMe: true,
    isFetching: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.isFetchingGetMe = true
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isFetchingGetMe = false
      })
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
  getMe,

  setFetching,
  setError,
  setUser,
  setEmail,
  setRecoveryCode,
}
