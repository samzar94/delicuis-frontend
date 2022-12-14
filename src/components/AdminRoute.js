import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

const AdminRoute = ({ component: Component, ...rest }) => {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          userInfo && userInfo.isAdmin ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to="/signin" />
          )
        }
      ></Route>
    </div>
  )
}

export default AdminRoute
