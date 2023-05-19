import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import AppError from '~/types/interfaces/app-error';

const API_URL = import.meta.env.VITE_API_URL;

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
    sendResetPasswordEmail: builder.mutation({
      query: (body) => ({
        url: 'forgot-password',
        method: 'PATCH',
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

    verifyRecoveryCode: builder.query({
      query: ({ email, recoveryCode }) => ({
        url: `verify-recovery-code?recoveryCode=${recoveryCode}&email=${email}`,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useSendResetPasswordEmailMutation,
  useResetPasswordMutation,

  useVerifyRecoveryCodeQuery,
} = authApi;
