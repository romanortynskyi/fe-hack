import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import AppError from '~/types/interfaces/app-error'

const API_URL = import.meta.env.VITE_API_URL

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/users/`,
  }) as BaseQueryFn<string | FetchArgs, unknown, AppError, {}>,
  endpoints: (builder) => ({
    checkIfUserExistsByEmail: builder.query({
      query: (email: string) => ({
        url: `exists-by-email?email=${email}`,
      })
    }),
  }),
})

export const {
  useCheckIfUserExistsByEmailQuery,
} = userApi
