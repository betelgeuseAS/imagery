/**
 * Removes entries whose values are either 0 or empty strings
 * @param obj object
 * @returns {Record<string, any>} sanitized object
 */
const sanitize = (obj: Record<string, any>) =>
  Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== '' && value !== 0))

export default sanitize
