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
    addIncome: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    updateIncome: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
    }),

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
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,

  useGetIncomesQuery,
} = incomeApi
