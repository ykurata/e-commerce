import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts, saveProduct } from '../actions/productActions';

const ProductsScreen = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {

    }
  }, [])

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveProduct(name, price, image, brand, category, countInStock, description));
  }


  return <div className="content content-margined">
    <div className="product-header">
      <h3>Products</h3>
      <button>Create Product</button>
    </div>

    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Product</h2>
          </li>
          <li>
            {loadingSave && <div>Loading...</div>}
            {errorSave && <div>{errorSave}</div>}
          </li>

          <li>
            <label htmlFor="name">
              Name
          </label>
            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor="price">
              Price
          </label>
            <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor="image">
              Image
          </label>
            <input type="text" name="image" id="image" onChange={(e) => setImage(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor="brand">
              Brand
          </label>
            <input type="text" name="brand" id="brand" onChange={(e) => setBrand(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor="countInStock">
              Count In Stock
          </label>
            <input type="text" name="countInStock" id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor="category">
              Category
          </label>
            <input type="text" name="category" id="category" onChange={(e) => setCategory(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor="description">
              Description
          </label>
            <textarea type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
          </li>
          <li>
            <button type="submit" className="button primary">Create</button>
          </li>
          <li>
            New to amazona?
        </li>
          <li>
            <Link to="/register" className="button secondary text-center">Create your amazona account</Link>
          </li>
        </ul>
      </form>
    </div>

    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}Name</td>
              <td>{product.price}Price</td>
              <td>{product.category}Category</td>
              <td>{product.brand}Brand</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  </div>



}

export default ProductsScreen;
