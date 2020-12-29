import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILES_SUCCESS,
  PRODUCT_DETAILES_REQUEST,
  PRODUCT_DETAILES_FAIL,
} from "../constants/productConstants"


import axios from 'axios';

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
}

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILES_REQUEST, payload: productId });
    const { data } = await axios.get('/products/' + productId);
    dispatch({ type: PRODUCT_DETAILES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILES_FAIL, payload: error.message });
  }
}

export { listProducts, detailsProduct };