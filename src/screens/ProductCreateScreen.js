import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { createProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/Messagebox'

export default function ProductCreateScreen(props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')

  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, success } = productCreate

  const dispatch = useDispatch()
  useEffect(() => {
    if (success) {
      props.history.push('/productlist')
    }
  }, [props.history, success])
  const submitHandler = (e) => {
    e.preventDefault()
    // TODO: dispatch update product
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      }),
    )
  }
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const bodyFormData = new FormData()
    bodyFormData.append('image', file)
    setLoadingUpload(true)
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      setImage(data)
      setLoadingUpload(false)
    } catch (error) {
      setErrorUpload(error.message)
      setLoadingUpload(false)
    }
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Product </h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="number"
                placeholder="Enter countInStock"
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Create
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
