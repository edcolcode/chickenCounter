import { 
  dataApiBasePath
} from '../../../utils/repo';
import { 
  selectCurrentUserToken, 
  logOut,
} from '../authSlice';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: dataApiBasePath,
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = selectCurrentUserToken(getState());
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
});
const redirectBaseQuery = async(args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error && (result.error?.status === 401 || result.error?.status === 403)) {
    api.dispatch(logOut());
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: redirectBaseQuery,
  endpoints: () => ({})
});