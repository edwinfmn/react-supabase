import React from 'react';
import Login from './pages/Login';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Template from './ui/Template';

const ProtectedRoute = ({ element, user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Template>{ element }</Template>;
};

const AppRouter = () => {
  const {user, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={<ProtectedRoute user={user} element={<Home />} />}
        />
        <Route
          path="/products"
          element={<ProtectedRoute user={user} element={<Products />} />}
        />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
