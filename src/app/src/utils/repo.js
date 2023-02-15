const _apibasePath = 'api';
const _dataBasePath = 'data-api';

const serverHost = (process.env === 'prod') 
  ? '' 
  : 'http://localhost:8080';

const prodEnv = process.env === 'prod';

export const apiBasePath = prodEnv
? _apibasePath
: `${serverHost}/${_apibasePath}`;

export const dataApiBasePath = prodEnv
? _dataBasePath 
: `${serverHost}/${_dataBasePath}`;

export const chickenCounts = 'chickenCounts';
export const token = 'token';

export const pageQueryParam = 'page';
export const pageSizeQueryParam = 'size';
export const sortQueryParam = 'sort';
export const sortAscExtra = ',asc';
export const sortDescExtra = ',desc';

/**
 * Builds a query using the provided keys and values.
 * 
 * @param {Map} queryMap param keys and values
 * 
 * @returns the generated query, example: ?page=1size=30
 */
export const buildQuery = (queryMap) => {
  const queryElements = [];
  queryMap.forEach((value, key) => {
    queryElements.push(`${key}=${value}`);
  });

  return '?' + queryElements.join('&');
}

/**
 * Returns the endpoint location.
 * @param {String} resource resource name.
 * @returns the endpoint location.
 */
export function getEndpoint(resource) {
  return `${dataApiBasePath}/${resource}`;
}