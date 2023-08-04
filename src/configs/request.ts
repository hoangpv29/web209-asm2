import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const fetchBaseQueryConfig = fetchBaseQuery({ baseUrl: 'http://localhost:3000' });

export default fetchBaseQueryConfig;
