import { PAGE_SIZE } from '../../../utils/constants';
import { getEmbeddedData } from '../../../utils/dataUtils';
import { 
  chickenCounts, 
  pageQueryParam, 
  pageSizeQueryParam, 
  buildQuery, 
  sortQueryParam
} from '../../../utils/repo'; 

import {baseApi} from './baseApi';


export const chickenCountsApi = baseApi.injectEndpoints({
  reducerPath: 'chickenCountsApi',
  endpoints: (build) => ({
    // GET
    getChickenCounts: build.query({
      query: ({page, pageSize, sort}) => {
        const paginationMap = new Map();
        paginationMap.set(pageQueryParam, page ? page : 0);
        paginationMap.set(pageSizeQueryParam, pageSize ? pageSize : PAGE_SIZE);
        paginationMap.set(sortQueryParam, sort);
        
        const paginationQuery = buildQuery(paginationMap);

        return `/${chickenCounts}${paginationQuery}`;
      },
      transformResponse: (response) => {
        const data = {};
        data[chickenCounts] = getEmbeddedData(response, chickenCounts);
        data.page = response.page;

        return data;
      },
      providesTags: ['ChickenCounts'] 
      /* Example of a complex tag invalidation
      providesTags: (result) => [
        result 
        ? 
          [
            ...result._embedded.chickenCounts.map(({id}) => ({type: 'ChickenCounts', id})),
            {type: 'ChickenCounts', id: 'LIST'}
          ]
        :
          [{type: 'ChickenCounts', id: 'LIST'}]
      ]
      */
    }),
    // POST
    addChickenCount: build.mutation({
      query: (body) => ({
        url: `/${chickenCounts}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['ChickenCounts'] //[{type: 'ChickenCounts', id: 'LIST'}]
    })
  })
});

export const {
  useGetChickenCountsQuery,
  useAddChickenCountMutation
} = chickenCountsApi;