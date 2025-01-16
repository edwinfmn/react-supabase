import React from 'react';
import Login from './pages/Login';
import useAuth from './hooks/useAuth';
import Template from './ui/Template';
import Home from './pages/Home';

const Router = ({ children }) => {
  const {user, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Login />;
  }
  return <Template><Home /></Template>;
};

export default Router;
