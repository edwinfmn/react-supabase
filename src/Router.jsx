import React from 'react';
import Login from './pages/Login';
import Products from './pages/Products';
import useAuth from './hooks/useAuth';

const Router = () => {
  const {user, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Login />;
  }
  return <Products /> ;
};

export default Router;
