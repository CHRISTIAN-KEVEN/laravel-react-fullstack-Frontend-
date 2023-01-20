import React, {  useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import styles from './UserForm.module.css';

const UserForm = (props) => {

    const location = useLocation();

    const navigate = useNavigate();
    let user = null;
    if(location.state && location.state.hasOwnProperty('user')) {
        user = location.state.user;
    }       
    
    const {id: userId} = useParams();

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  

  useEffect(() => {
    if(userId) {
        if(user) 
            return setUserData(user);

            setIsLoading(true);
            axiosClient.get(`/users/${userId}`).then(resp => {
                const { data } = resp;
                console.log('User data obtained ', data);
                setUserData(data.data);
            }).catch(err => {
                if(err.response) {
                    const { response } = err;
                    if(response.status === 422) {
                        setFormErrors(response.data.errors);
                    }
                }
          })
            .finally(() => setIsLoading(false));
        
      }

      if(!userId) return;
      if(user) return setUserData(user);
        
      setIsLoading(true);
      axiosClient.get(`/users/${userId}`).then(resp => {
          const { data } = resp;
          console.log('User data obtained ', data);
          setUserData(data);
      }).catch(err => {
            if(err.response) {
                const { response } = err;
                if(response.status === 422) {
                    setFormErrors(response.data.errors);
                }
            }
      })
      .finally(() => setIsLoading(false));

  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    // const payload = {
    //     name: nameRef.current.value,
    //     email: emailRef.current.value,
    //     password: passwordRef.current.value,
    //     password_confirmation: passwordConfirmRef.current.value
    // };

   if(!userId) {
     
      axiosClient.post( '/users', userData).then(resp => {
        console.log('Response ', resp);
        navigate('/users');
      }).catch(err => {
        console.log('Error creating user ', err);
        if(!err.response) return;
        const { response } = err;
        if(response.status === 422) {
            console.log(response.data);
            setFormErrors(response.data.errors);
        }
      })
   }
   else {
     axiosClient.put( `users/${userId}`, userData).then(resp => {
        console.log('Response ', resp);
        // TODO: Show Notification
        navigate('/users');
     }).catch(err => console.log('Error creating user ', err))
   }

  }

  return (
    <>
        <h1>
            { userId ? 'Update User': 'New User'}
        </h1>
        <div className='card animate fadeInDown'>
            {isLoading && <div className='text-center'>Loading...</div>}
            {
                !isLoading && 
                <form onSubmit={submitHandler}>
                    <input value={userData.name} onChange={evt => setUserData({...userData, name: evt.target.value})} type="text"  placeholder="Full Name"/>
                    {formErrors.hasOwnProperty('name') && <span className='error-msg'>{formErrors.name}</span>}
                    <input value={userData.email} onChange={evt => setUserData({...userData, email: evt.target.value})} type="email" placeholder='Email Address' />
                    {formErrors.hasOwnProperty('email') && <span className='error-msg'>{formErrors.email}</span>}
                    <input type="password" placeholder='Enter password' onChange={evt => { userData.password = evt.target.value}} />
                    {formErrors.hasOwnProperty('password') && <ul>
                        {
                            formErrors.password.map(error => <li style={{color: 'red', position: 'relative', bottom: '10px'}}>{error}</li>)
                        }
                    </ul> }
                    <input type="password" placeholder='Password Confirmation' onChange={evt => { userData.password_confirmation = evt.target.value}}/>
                    <button className='btn btn-submit'>Submit</button>
                </form>
            }
        </div>
    </>
  )
}

export default UserForm