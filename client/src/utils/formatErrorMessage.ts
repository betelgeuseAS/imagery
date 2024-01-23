import { typesCommon } from '../types'

/**
 * Formats error response from server
 * @param {any} err error response from server
 * @returns {String} error message as string
 */
const formatErrorMessage = (err: typesCommon.IErrorResponse | typesCommon.IErrorResponse['message'] | any): string => {
  if (typeof err === 'string') {
    return err
  }

  if (typeof err.message === 'string') {
    return err.message
  }

  return 'Unknown server error'
}

export default formatErrorMessage
