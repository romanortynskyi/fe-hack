import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import AppError from '~/types/interfaces/app-error'

const API_URL = import.meta.env.VITE_API_URL

export const incomeApi = createApi({
  reducerPath: 'incomeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/incomes/`,
  }) as BaseQueryFn<string | FetchArgs, unknown, AppError, {}>,
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: ({ token, page, perPage }) => ({
        url: `?page=${page}&perPage=${perPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const {

  useGetIncomesQuery,
} = incomeApi
