import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import { typesCommon, typesUser } from '../../types'
import api from './api'

const apiWithUserTags = api.enhanceEndpoints({ addTagTypes: ['User'] })

const userApi = apiWithUserTags.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<typesUser.IUserWithoutPassword, typesUser.ICreateUserRequest>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),
    getUsers: builder.query<typesCommon.IQueryResult<typesUser.IUserWithoutPassword>, typesUser.IGetUsersRequestParams>(
      {
        query: (params) => ({
          url: 'users',
          method: 'GET',
          params
        }),
        providesTags: (data) =>
          data && data.results
            ? [
                ...data.results.map(({ id }) => ({ type: 'User' as const, id })),
                { type: 'User', id: 'PARTIAL-USER-LIST' }
              ]
            : [{ type: 'User', id: 'PARTIAL-USER-LIST' }]
      }
    ),
    getSingleUser: builder.query<typesUser.IUserWithoutPassword, typesUser.IGetSingleUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'GET'
      }),
      providesTags: (result) => (result ? [{ type: 'User', id: result.id }] : ['User'])
    }),
    updateUser: builder.mutation<typesUser.IUserWithoutPassword, typesUser.IUpdateUserRequest>({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
        { type: 'User', id: 'PARTIAL-USER-LIST' }
      ]
    }),
    deleteUser: builder.mutation<void, typesUser.IDeleteUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
        { type: 'User', id: 'PARTIAL-USER-LIST' }
      ]
    })
  })
})

// Selectors
// TODO: fix selectUsers > always returns undefined
export const selectUsers = userApi.endpoints.getUsers.select({})
export const selectUserById = (id: typesUser.IUser['id']) => userApi.endpoints.getSingleUser.select({ id })
export const selectUserFromList = (id: typesUser.IUser['id']) =>
  createSelector(selectUsers, (response) => response.data?.results.find((user) => user.id === id))

export const getLoggedInUser = (): typesUser.IUserWithoutPassword | null => {
  let user: typesUser.IUserWithoutPassword | null = null
  const id = sessionStorage.getItem('userId') || localStorage.getItem('userId')

  if (id) {
    const { data } = useSelector(selectUserById(id))
    if (data) {
      user = data
    }
  }

  return user
}

export const getUserById = (id: typesUser.IUser['id']): typesUser.IUserWithoutPassword | undefined => {
  const { data } = useSelector(selectUserById(id))
  return data
}

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi
export default userApi

export const useCurrentUser = () => {
  let user: typesUser.IUserWithoutPassword | null = null
  const id = sessionStorage.getItem('userId') || localStorage.getItem('userId')
  if (id) {
    const { data } = useGetSingleUserQuery({ id })
    if (data) {
      user = data
    }
  }
  return user
}
