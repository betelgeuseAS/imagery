import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

import routes from './routes'
import { localStore, sessionStore } from '../services'
import { useGetSingleUserQuery } from '../redux/api/user.api'

import Loader from '../components/Loader'

type Props = {
  element: JSX.Element
  restrictedTo: string[]
}

const RequireAuth = ({ element, restrictedTo }: Props) => {
  const location = useLocation()

  const id = sessionStore.getUserId() || localStore.getUserId()

  if (id) {
    const { data: user, isLoading } = useGetSingleUserQuery({ id })

    if (isLoading) return <Loader />
    if (user && restrictedTo.includes(user.role)) return element
  }

  return <Navigate to={routes.Login.absolutePath} state={{ from: location }} replace={true} />
}

export default RequireAuth
