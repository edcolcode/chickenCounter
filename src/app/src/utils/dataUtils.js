/**
 * Returns the payload response from a response service call.
 * @param {object} data response data object.
 * @param {string} service service name.
 * @returns an array with the response payload or an empty array if nothing was found.
 */
export const getEmbeddedData = (data, service) => {
  if (data && data._embedded && data._embedded[service]) {
    return data._embedded[service];
  }

  return [];
};