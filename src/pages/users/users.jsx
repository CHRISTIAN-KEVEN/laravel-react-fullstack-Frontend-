import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';
import styles from './users.module.css';

const Users = (props) => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setIsLoading(true);
        axiosClient.get('/users').then(resp => {
            setUsers(prevState => resp.data.data);
            console.log('Users ', users)
        }).finally(() => setIsLoading(false));
    };

    const deleteHandler = (user) => {
        if(!window.confirm('Are you sure you want to delete this user ?')) {
            return;
        }
        setIsLoading(true);
        axiosClient.delete(`/users/${user.id}`, {}).then(resp => {
            // setUsers(prevState => prevState.filter(u => u.id !== user.id))
            getUsers();
            // alert('User deleted successfully !');
        }).catch(err => console.log('Failed to Delete user '))
        .finally(() => setIsLoading(false))

    }

  return (
    <div>
        <div className={styles.wrapper}>
            <h1>Users</h1>
            <Link to='/users/new' className='btn-add'>Add new</Link>
        </div>
        <div className='card animated fadeInDown'>
            <table>
               <thead>
                 <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Create date</th>
                    <th>Actions</th>
                  </tr>
               </thead>
              {
                isLoading ?  <tbody>
                <tr>
                    <td colSpan="5" className='text-center'>
                        Loading...
                    </td>
                </tr>
               </tbody>
               :
               <tbody>
               {
                   users && users.map(user => 
                       <tr key={user.id}>
                           <td>{user.id}</td>
                           <td>{user.name}</td>
                           <td>{user.email}</td>
                           <td>{user.created_at}</td>
                           <td style={{display: 'flex', justifyContent: 'space-around'}}>
                               <Link to={`/users/${user.id}`} className="btn btn-edit" state={{user}}>Edit</Link>
                               <button onClick={(event) => deleteHandler(user)} className='btn btn-delete'>Delete</button>
                           </td>
                       </tr>
                       )
               }
               <tr>

               </tr>
              </tbody>
              }
              
            </table>
        </div>
    </div>
  )
}

export default Users