import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/Messagebox'
import { USER_DETAILS_RESET } from '../constants/userConstants'

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList)
  const { users, loading, error } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete

  const deletehandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id))
    }
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listUsers())
    dispatch({
      type: USER_DETAILS_RESET,
    })
  }, [dispatch, successDelete])

  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Success</MessageBox>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox className="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'Yes' : 'No'}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="small"
                    type="button"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="small"
                    type="button"
                    onClick={() => deletehandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
