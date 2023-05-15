import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import AppError from '~/types/interfaces/app-error'

const API_URL = import.meta.env.VITE_API_URL

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth/`,
  }) as BaseQueryFn<string | FetchArgs, unknown, AppError, {}>,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: 'sign-up',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    sendRecoveryCode: builder.mutation({
      query: (body) => ({
        url: 'forgot-password',
        method: 'POST',
        body,
      }),
    }),
    verifyRecoveryCode: builder.mutation({
      query: (body) => ({
        url: 'verify-recovery-code',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: 'reset-password',
        method: 'PATCH',
        body,
      }),
    }),
  }),
})

export const {
  useSignUpMutation,
  useLoginMutation,
  useSendRecoveryCodeMutation,
  useVerifyRecoveryCodeMutation,
  useResetPasswordMutation,
} = authApi
