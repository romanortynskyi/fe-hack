import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: { signup: () => {} },
})

export const { reducer: authReducer } = authSlice
export const { signup } = authSlice.actions
