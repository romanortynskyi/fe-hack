import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import AppError from '~/types/interfaces/app-error';

const API_URL = process.env.VITE_API_URL;

export const depositApi = createApi({
  reducerPath: 'depositApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/deposits/`,
  }) as BaseQueryFn<string | FetchArgs, unknown, AppError, {}>,
  endpoints: (builder) => ({
    addDeposit: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    updateDeposit: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteDeposit: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
    }),

    getDeposits: builder.query({
      query: ({ token, page, perPage }) => ({
        url: `?page=${page}&perPage=${perPage}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useAddDepositMutation,
  useUpdateDepositMutation,
  useDeleteDepositMutation,

  useGetDepositsQuery,
} = depositApi;
