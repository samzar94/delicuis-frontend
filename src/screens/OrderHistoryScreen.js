import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOderMine } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import Messagebox from '../components/Messagebox'

const OrderHistoryScreen = (props) => {
  const orderMineList = useSelector((state) => state.orderMineList)
  const { loading, error, orders } = orderMineList
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('en el effect')
    dispatch(listOderMine())
  }, [dispatch])

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox variant="danger">{error}</Messagebox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.isDeliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <button
                  type="button"
                  className="small"
                  onClick={() => props.history.push(`/order/${order._id}`)}
                >
                  Details
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {console.log('fin de render')}
    </div>
  )
}

export default OrderHistoryScreen
