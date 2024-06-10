import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Login from "@pages/Login";
import SignUp from '@pages/SignUp';
import "./assets/styles/main.scss";
import Home from '@pages/Home';
import { isAuthenticated } from '@api/auth';
import Header from '@components/layout/Header';
import EditPet from '@pages/EditPet';
import ShowPet from '@pages/ShowPet';
import User from '@pages/User';

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <Navigate to="/home" /> : <Login />,
  }, {
    path: "/cadastro",
    element: <SignUp />
  },
  {
    element: <div>
      <Header />
      <PrivateRoute />
    </div>,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/novo-pet",
        element: <EditPet />
      }, {
        path: "/ver-pet/:id",
        element: <ShowPet />
      },
      {
        path: "/editar-pet/:id",
        element: <EditPet />
      },
      {
        path: "/usuario",
        element: <User />
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='view'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
