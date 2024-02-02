// baseQuery.ts

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }); // Replace with your actual base URL

// export const baseQuery = fetchBaseQuery({ baseUrl: 'https://clubhub-admin-backend.onrender.com/' });
