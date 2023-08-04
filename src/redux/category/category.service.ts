import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBaseQueryConfig from '../../configs/request';
import { Icategory } from '../../interface/index';

const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQueryConfig,
    endpoints: (builder) => ({
        getCategories: builder.query<Icategory[], void>({
            query: () => '/categories',
        }),
       
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
export default categoryApi;
