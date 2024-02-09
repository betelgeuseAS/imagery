import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { typesCommon } from '../types'
import * as utils from '../utils'

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(
      utils.formatErrorMessage(
        action.payload.data as typesCommon.IErrorResponse | typesCommon.IErrorResponse['message']
      )
    )
  }

  return next(action)
}
