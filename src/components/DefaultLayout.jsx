import React, { useEffect } from 'react'
import { Navigate, Outlet, Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useAuthContext } from '../contexts/AuthContext'

function DefaultLayout() {

const {user, setUser, token, setToken} = useAuthContext();

useEffect(() => {
    axiosClient.get('/user').then(resp => {
        setUser(resp.data);
    }).then(err => {

    })
}, [])

console.log('No token ', token);
if(!token) {
    console.log('No token ', token);
    return <Navigate to="/login" />;
}

  const logoutHandler = (evt) => {
        evt.preventDefault();
        import.meta.env.VITE_API_BASE_URL;
        axiosClient.post('/logout', {}).then(resp => {
            setUser({});
            setToken(null);
        });
  };

  return (
    <div id="defaultLayout">

        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        <div className='content'>
            <header>
                <div>
                    Header
                </div>
                <div>
                   {user.name}
                   <a href="#" onClick={logoutHandler} className="btn-logout">Logout</a>
                </div>
            </header>
            <main>
             <Outlet />
            </main>
        </div>
 
    </div>
  )
}

export default DefaultLayout