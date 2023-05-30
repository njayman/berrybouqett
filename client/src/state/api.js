import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getNotes: build.query({
      query: () => "notes",
      providesTags: ["Notes"],
    }),
    getNoteStatus: build.query({
      query: () => "notes/status",
      providesTags: ["NoteStatus"],
    }),
    addNotes: build.mutation({
      query(body) {
        return {
          url: `notes/add`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Notes"],
    }),
    setNotesDownloaded: build.mutation({
      query({ params, body }) {
        console.log(params);
        return {
          url: `notes/${params.id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Notes", "NoteStatus"],
    }),
    setNotesDownloadedAll: build.mutation({
      query() {
        return {
          url: `notes/downloadall`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Notes", "NoteStatus"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useGetNotesQuery,
  useGetNoteStatusQuery,
  useAddNotesMutation,
  useSetNotesDownloadedMutation,
  useSetNotesDownloadedAllMutation
} = api;
