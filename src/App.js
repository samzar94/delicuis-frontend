import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { listProductCategories } from './actions/productActions'
import { signout } from './actions/userActions'
import AdminRoute from './components/AdminRoute'
import LoadingBox from './components/LoadingBox'
import MessageBox from './components/Messagebox'
import PrivateRoute from './components/PrivateRoute'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import SearchScreen from './screens/SearchScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import SigninScreen from './screens/SigninScreen'
import UserListScreen from './screens/UserListScreen'

function App() {
  console.log('app loading')
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }

  const productCategoryList = useSelector((state) => state.productCategoryList)
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList
  useEffect(() => {
    dispatch(listProductCategories())
    console.log('effect loading')
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              DeliciusShop
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"> User profile</Link>
                  </li>
                  <li>
                    <Link to="orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sing Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sing In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productList">Products</Link>
                  </li>
                  <li>
                    <Link to="/OrderList">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Switch>
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route
              path="/product/:id/edit"
              component={ProductEditScreen}
              exact
            ></Route>
            <Route
              path="/productcreate"
              component={ProductCreateScreen}
              exact
            ></Route>
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/payment" component={PaymentMethodScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <AdminRoute
              path="/userlist"
              component={UserListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
              exact
            ></AdminRoute>
            <Route
              path="/search/category/:category"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              component={SearchScreen}
              exact
            ></Route>
            <PrivateRoute path="/profile" component={ProfileScreen} />
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/productlist/pageNumber/:pageNumber"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <Route path="/" component={HomeScreen} exact />
          </Switch>
        </main>
        <footer className="row center">All Right Reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
