import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Users from "./pages/users/users";
import Signup from "./pages/signup/signup";
import NotFound from "./pages/NotFound/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import UserForm from "./pages/user-form/UserForm";

const router = createBrowserRouter([

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/login' />
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/users' />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
           
            {
                path: '/users/new',
                element: <UserForm key="create" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="update"/>
            },
            {
                path: '*',
                element: <NotFound />
            },
        ]
    }
   
]);

export default router;