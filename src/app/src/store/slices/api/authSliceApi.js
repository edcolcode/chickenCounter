import { 
  token, 
  apiBasePath 
} from '../../../utils/repo';
import { setCredentials, logOut } from '../authSlice';

import { Buffer } from 'buffer';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({baseUrl: apiBasePath});
const authBaseQuery = async(args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    api.dispatch(logOut());
    return result;
  }

  const {
    user,
    token,
    roles
  } = result.data;

  api.dispatch(setCredentials({
    user: user, 
    accessToken: token,
    roles: roles
  }));

  return result;
}
// const baseQueryWithReauth = async(args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error && result?.error?.status === 401) {
//     const refreshResult = await baseQuery('/refreshToken', api, extraOptions);

//     if (refreshResult?.data) {
//       api.dispatch(setCredentials({
//         user: args, 
//         accessToken: refreshResult.data.token
//       }));
      
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }

//   return result;
// }

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: 'authApi',
  endpoints: (build) => ({
    getToken: build.mutation({
      query: (credentials) => {
        const {username, password} = credentials;
        const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

        return {
          url: `${token}`,
          method: 'POST',
          headers: {
            Authorization: `Basic ${encodedCredentials}`
          }
        };
      }
    })
  })
});

export const {
  useGetTokenMutation
} = authApi;