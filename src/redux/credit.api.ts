import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import LocalStorageKeys from '~/types/enums/local-storage-keys';

import AppError from '~/types/interfaces/app-error';

const API_URL = process.env.VITE_API_URL;

export const creditApi = createApi({
  reducerPath: 'creditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/credits/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageKeys.Token);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
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
