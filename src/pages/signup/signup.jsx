import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './signup.module.css';

const Signup = () =>  {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const {setUser, setToken, formErrors, setFormErrors} = useAuthContext();

  const submitHandler = (event) => {
    event.preventDefault()
     console.log(event);
     const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmRef.current.value
     };
     console.log(payload);

     setFormErrors({});
     axiosClient.post('/signup', payload).then(response => {
        const { data } = response;
        setUser(data.user);
        setToken(data.token);

     }).catch(err => {
        const { response } = err;
        if( response && response.status === 422) {
            console.log('Errors ', response);
            setFormErrors(response.data.errors);
        }
     })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
    <div className='form'>
        <form onSubmit={submitHandler}>
            <h1 className='title'>SignUp</h1>
            <input ref={nameRef} type="text" name='fullname' placeholder='Full name'/>
            {formErrors.hasOwnProperty('name') && <span className='error-msg'>{formErrors.name}</span>}
            <input ref={emailRef} type="email" name='email' placeholder='Email address'/>
            {formErrors.hasOwnProperty('email') && <span className='error-msg'>{formErrors.email}</span>}
            <input ref={passwordRef} type="password" name='password' placeholder='Password'/>
            {formErrors.hasOwnProperty('password') && <span className='error-msg'>{formErrors.password}</span>}
            <input ref={passwordConfirmRef} type="password" name='passwordConfirm' placeholder='Password Confirmation'/>
            <button className='btn btn-block'>Submit</button>
            <p className='message'>
                Already Registered? <Link to="/login">Sign in</Link>
            </p>
        </form>
    </div>
</div>
  )
}

export default Signup