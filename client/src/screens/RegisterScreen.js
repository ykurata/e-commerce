import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
    return () => {

    }
  }, [userInfo])

  const submitHandler = e => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }


  return <div className="form">
    <form onSubmit={submitHandler}>
      <ul className="form-container">
        <li>
          <h2>Sign In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
        </li>
        <li>
          <label htmlFor="email">
            Password
          </label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
        </li>
        <li>
          <button type="submit" className="button primary">Signin</button>
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

}

export default RegisterScreen;

