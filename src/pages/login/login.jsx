import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../axios-client';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './login.module.css';

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();

  const {setUser, setToken, formErrors, setFormErrors} = useAuthContext();

  const submitHandler = (event) => {
     event.preventDefault();
     const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value
     };

     setFormErrors({});
     axiosClient.post('login', payload).then(response => {
        const {user, token} = response.data;
        console.log('Response ', response);
        setUser(user);
        setToken(token);
     }).catch(err => {
        console.log('Error trying to login ', err);
        setFormErrors(err.response.data);

     })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
            <form onSubmit={submitHandler}>
                <h1 className='title'>Login into your account</h1>
                {
                formErrors && formErrors.hasOwnProperty('message') && 
                <p className={styles['error-block']}>
                  {formErrors.message }
               </p>
               }
                <input ref={emailRef} type="email" name='email' placeholder='Email'/>
                {formErrors.hasOwnProperty('email') && <span className={styles['error-msg']}>{formErrors.email}</span>}
                <input ref={passwordRef} type="password" name='password' placeholder='Password'/>
                <button className='btn btn-block'>Login</button>
                <p className='message'>
                    Not registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    </div>
  );
}

export default Login;