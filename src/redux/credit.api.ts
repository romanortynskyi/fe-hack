import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import AppError from '~/types/interfaces/app-error';

const API_URL = import.meta.env.VITE_API_URL;

export const creditApi = createApi({
  reducerPath: 'creditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/credits/`,
  }) as BaseQueryFn<string | FetchArgs, unknown, AppError, {}>,
  endpoints: (builder) => ({
    addCredit: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    updateCredit: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteCredit: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
    }),

    getCredits: builder.query({
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
  useAddCreditMutation,
  useUpdateCreditMutation,
  useDeleteCreditMutation,

  useGetCreditsQuery,
} = creditApi;
