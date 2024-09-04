// @ts-check
/**
 * Returns the URL Search Parameters
 * @returns {URLSearchParams} The URL parameters object
 */
export function getURLParams() {
  return new URLSearchParams(window.location.search);
}
