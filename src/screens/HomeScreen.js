import React, { useEffect } from 'react'
import Product from './../components/Product'
import MessageBox from '../components/Messagebox'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        //aqui cambie la clase por "row center"
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeScreen
